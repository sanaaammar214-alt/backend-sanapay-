import { Repository } from 'typeorm';
import { Bill, BillStatus } from './bill.entity';
import { CreateBillDto, UpdateBillDto } from './dto/bill.dto';
import { EwalletService } from '../ewallet/ewallet.service';
export declare class BillsService {
    private billRepository;
    private ewalletService;
    constructor(billRepository: Repository<Bill>, ewalletService: EwalletService);
    create(userId: number, createBillDto: CreateBillDto): Promise<{
        message: string;
        bill: {
            id: string;
            title: string;
            amount: number;
            status: BillStatus;
            category: import("./bill.entity").BillCategory;
            dueDate: Date;
            notes: string;
            accountNumber: string;
            paidAt: Date;
            transactionId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(userId: number, status?: BillStatus, category?: string): Promise<{
        bills: {
            id: string;
            title: string;
            amount: number;
            status: BillStatus;
            category: import("./bill.entity").BillCategory;
            dueDate: Date;
            notes: string;
            accountNumber: string;
            paidAt: Date;
            transactionId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    findOne(userId: number, billId: string): Promise<{
        id: string;
        title: string;
        amount: number;
        status: BillStatus;
        category: import("./bill.entity").BillCategory;
        dueDate: Date;
        notes: string;
        accountNumber: string;
        paidAt: Date;
        transactionId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: number, billId: string, updateBillDto: UpdateBillDto): Promise<{
        message: string;
        bill: {
            id: string;
            title: string;
            amount: number;
            status: BillStatus;
            category: import("./bill.entity").BillCategory;
            dueDate: Date;
            notes: string;
            accountNumber: string;
            paidAt: Date;
            transactionId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(userId: number, billId: string): Promise<{
        message: string;
    }>;
    pay(userId: number, billId: string): Promise<{
        message: string;
        bill: {
            id: string;
            title: string;
            amount: number;
            status: BillStatus;
            category: import("./bill.entity").BillCategory;
            dueDate: Date;
            notes: string;
            accountNumber: string;
            paidAt: Date;
            transactionId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        remainingBalance: number;
    }>;
    private formatBill;
    countPaidBills(userId: number): Promise<number>;
}
