import { TransactionsService } from './transactions.service';
import { DepositDto, WithdrawDto } from './dto/transaction.dto';
import { TransferDto } from './dto/transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    deposit(req: any, depositDto: DepositDto): Promise<{
        message: string;
        balance: number;
    }>;
    withdraw(req: any, withdrawDto: WithdrawDto): Promise<{
        message: string;
        balance: number;
    }>;
    getHistory(req: any, limit?: number): Promise<{
        total: number;
        transactions: {
            id: string;
            type: import("./transaction.entity").TransactionType;
            amount: number;
            status: import("./transaction.entity").TransactionStatus;
            description: string;
            reference: string;
            balanceBefore: number;
            balanceAfter: number;
            createdAt: Date;
        }[];
    }>;
    getStats(req: any): Promise<{
        currentBalance: number;
        totalDeposited: number;
        totalWithdrawn: number;
        totalTransactions: number;
        paidBills: number;
    }>;
    transfer(req: any, dto: TransferDto): Promise<{
        message: string;
        balanceAfter: string;
    }>;
}
