import { Repository } from 'typeorm';
import { Merchant } from '../merchants/merchant.entity';
import { EwalletService } from '../ewallet/ewallet.service';
export declare class PaymentsService {
    private merchantRepo;
    private ewalletService;
    constructor(merchantRepo: Repository<Merchant>, ewalletService: EwalletService);
    pay(payerId: number, merchantId: number, amount: number): Promise<{
        message: string;
        amount: number;
        merchant: string;
    }>;
}
