import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './merchant.entity';
import { User, AccountType } from '../user/user.entity';

@Injectable()
export class MerchantsService {

  constructor(
    @InjectRepository(Merchant)
    private merchantRepo: Repository<Merchant>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async upgradeToBusiness(userId: number, businessName: string) {

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (user.accountType === AccountType.BUSINESS) {
      throw new BadRequestException('Déjà un compte BUSINESS');
    }

    user.accountType = AccountType.BUSINESS;
    await this.userRepo.save(user);

    const merchant = this.merchantRepo.create({
      businessName,
      user,
    });

    return this.merchantRepo.save(merchant);
  }
}
