import { Repository } from 'typeorm';
import { Ewallet } from './ewallet.entity';
import { Transaction } from '../transactions/transaction.entity';
export declare class EwalletService {
    private readonly ewalletRepo;
    private readonly txRepo;
    constructor(ewalletRepo: Repository<Ewallet>, txRepo: Repository<Transaction>);
    createWallet(userId: number): Promise<Ewallet>;
    getWalletByUserId(userId: number): Promise<Ewallet>;
    deposit(userId: number, amount: number): Promise<Ewallet>;
    withdraw(userId: number, amount: number): Promise<Ewallet>;
    getWalletByNumber(walletNumber: string): Promise<Ewallet>;
    saveWallet(wallet: Ewallet): Promise<Ewallet>;
}
