import { User } from '../user/user.entity';
export declare enum BillCategory {
    ELECTRICITY = "ELECTRICITY",
    WATER = "WATER",
    INTERNET = "INTERNET",
    PHONE = "PHONE",
    GAS = "GAS",
    INSURANCE = "INSURANCE",
    SUBSCRIPTION = "SUBSCRIPTION",
    RENT = "RENT",
    OTHER = "OTHER"
}
export declare enum BillStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    OVERDUE = "OVERDUE",
    CANCELLED = "CANCELLED"
}
export declare class Bill {
    id: string;
    title: string;
    amount: number;
    status: BillStatus;
    category: BillCategory;
    dueDate: Date;
    notes: string;
    accountNumber: string;
    paidAt: Date;
    transactionId: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
