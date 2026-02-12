import { Response } from 'express';
import { BillsService } from './bills.service';
import { CreateBillDto, UpdateBillDto } from './dto/bill.dto';
import { BillStatus } from './bill.entity';
export declare class BillsController {
    private readonly billsService;
    constructor(billsService: BillsService);
    create(req: any, createBillDto: CreateBillDto): Promise<{
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
    findAll(req: any, status?: BillStatus, category?: string): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, updateBillDto: UpdateBillDto): Promise<{
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
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
    pay(req: any, id: string): Promise<{
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
    downloadPdf(req: any, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
