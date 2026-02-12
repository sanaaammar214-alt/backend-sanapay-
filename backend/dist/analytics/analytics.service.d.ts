import { Repository } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';
import { Bill, BillStatus } from '../bills/bill.entity';
import { Ewallet } from '../ewallet/ewallet.entity';
export declare class AnalyticsService {
    private transactionRepository;
    private billRepository;
    private ewalletRepository;
    constructor(transactionRepository: Repository<Transaction>, billRepository: Repository<Bill>, ewalletRepository: Repository<Ewallet>);
    getSummary(userId: number): Promise<{
        balance: number;
        totalDeposits: number;
        totalWithdrawals: number;
        transactionCount: number;
        bills: {
            pending: number;
            paid: number;
            overdue: number;
            totalPendingAmount: number;
        };
    }>;
    getMonthlyAnalytics(userId: number): Promise<{
        months: any[];
    }>;
    getYearlyAnalytics(userId: number): Promise<{
        years: any[];
    }>;
    getCategoryAnalytics(userId: number): Promise<{
        categories: {
            category: any;
            count: number;
            total: number;
            average: number;
        }[];
        topBills: {
            id: string;
            title: string;
            amount: number;
            category: import("../bills/bill.entity").BillCategory;
            status: BillStatus;
        }[];
    }>;
    private getEmptySummary;
}
