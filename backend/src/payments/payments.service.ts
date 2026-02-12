import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../merchants/merchant.entity';
import { User } from '../user/user.entity';
import { EwalletService } from '../ewallet/ewallet.service';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Merchant)
    private merchantRepo: Repository<Merchant>,

    private ewalletService: EwalletService,
  ) {}

  async pay(
    payerId: number,
    merchantId: number,
    amount: number,
  ) {

    const merchant = await this.merchantRepo.findOne({
      where: { id: merchantId },
      relations: ['user'],
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    if (merchant.user.id === payerId) {
      throw new BadRequestException('Cannot pay yourself');
    }

    // 1️⃣ Débiter client
    await this.ewalletService.withdraw(payerId, amount);

    // 2️⃣ Créditer merchant
    await this.ewalletService.deposit(merchant.user.id, amount);

    return {
      message: 'Payment successful',
      amount,
      merchant: merchant.businessName,
    };
  }
}
