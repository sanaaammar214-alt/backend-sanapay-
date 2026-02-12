export declare enum TransactionType {
    DEPOSIT = "DEPOSIT",
    WITHDRAW = "WITHDRAW",
    TRANSFER = "TRANSFER",
    BILL = "BILL",
    PAYMENT = "PAYMENT",
    PAYOUT = "PAYOUT"
}
export declare enum TransactionStatus {
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
export declare class Transaction {
    id: string;
    type: TransactionType;
    amount: string;
    status: TransactionStatus;
    description?: string;
    reference: string;
    walletId: string;
    balanceBefore?: string;
    balanceAfter?: string;
    createdAt: Date;
}
