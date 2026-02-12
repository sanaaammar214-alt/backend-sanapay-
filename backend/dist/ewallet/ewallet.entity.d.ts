import { User } from '../user/user.entity';
export declare enum WalletStatus {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    CLOSED = "CLOSED"
}
export declare class Ewallet {
    id: string;
    walletNumber: string;
    balance: string;
    currency: string;
    status: WalletStatus;
    totalDeposited: string;
    totalWithdrawn: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
