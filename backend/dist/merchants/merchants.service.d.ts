import { Repository } from 'typeorm';
import { Merchant } from './merchant.entity';
import { User } from '../user/user.entity';
export declare class MerchantsService {
    private merchantRepo;
    private userRepo;
    constructor(merchantRepo: Repository<Merchant>, userRepo: Repository<User>);
    upgradeToBusiness(userId: number, businessName: string): Promise<Merchant>;
}
