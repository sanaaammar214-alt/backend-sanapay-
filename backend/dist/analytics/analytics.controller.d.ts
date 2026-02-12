import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getSummary(req: any): Promise<{
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
    getMonthlyAnalytics(req: any): Promise<{
        months: any[];
    }>;
    getYearlyAnalytics(req: any): Promise<{
        years: any[];
    }>;
    getCategoryAnalytics(req: any): Promise<{
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
            status: import("../bills/bill.entity").BillStatus;
        }[];
    }>;
}
