import { Ewallet } from '../ewallet/ewallet.entity';
export declare enum AccountType {
    PERSONAL = "PERSONAL",
    BUSINESS = "BUSINESS"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    isActive: boolean;
    isEmailVerified: boolean;
    accountType: AccountType;
    createdAt: Date;
    updatedAt: Date;
    ewallet: Ewallet;
}
