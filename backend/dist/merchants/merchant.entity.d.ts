import { User } from '../user/user.entity';
export declare class Merchant {
    id: number;
    businessName: string;
    businessAddress: string;
    status: string;
    createdAt: Date;
    user: User;
}
