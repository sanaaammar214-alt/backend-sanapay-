import { Repository } from 'typeorm';
import { Transaction, TransactionType, TransactionStatus } from './transaction.entity';
import { EwalletService } from '../ewallet/ewallet.service';
import { DepositDto, WithdrawDto } from './dto/transaction.dto';
import { TransferDto } from './dto/transaction.dto';
import { BillsService } from '../bills/bills.service';
export declare class TransactionsService {
    private readonly transactionRepository;
    private readonly ewalletService;
    private readonly billsService;
    constructor(transactionRepository: Repository<Transaction>, ewalletService: EwalletService, billsService: BillsService);
    deposit(userId: number, depositDto: DepositDto): Promise<{
        message: string;
        balance: number;
    }>;
    withdraw(userId: number, withdrawDto: WithdrawDto): Promise<{
        message: string;
        balance: number;
    }>;
    getHistory(userId: number, limit?: number): Promise<{
        total: number;
        transactions: {
            id: string;
            type: TransactionType;
            amount: number;
            status: TransactionStatus;
            description: string;
            reference: string;
            balanceBefore: number;
            balanceAfter: number;
            createdAt: Date;
        }[];
    }>;
    getStats(userId: number): Promise<{
        currentBalance: number;
        totalDeposited: number;
        totalWithdrawn: number;
        totalTransactions: number;
        paidBills: number;
    }>;
    transfer(userId: number, dto: TransferDto): Promise<{
        message: string;
        balanceAfter: string;
    }>;
}
