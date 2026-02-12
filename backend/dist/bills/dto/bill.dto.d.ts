import { BillCategory, BillStatus } from '../bill.entity';
export declare class CreateBillDto {
    title: string;
    amount: number;
    category: BillCategory;
    dueDate?: string;
    notes?: string;
    accountNumber?: string;
}
export declare class UpdateBillDto {
    title?: string;
    amount?: number;
    status?: BillStatus;
    category?: BillCategory;
    dueDate?: string;
    notes?: string;
    accountNumber?: string;
}
