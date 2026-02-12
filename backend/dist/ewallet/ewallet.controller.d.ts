import { EwalletService } from './ewallet.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
export declare class EwalletController {
    private readonly service;
    constructor(service: EwalletService);
    getMyWallet(req: any): Promise<import("./ewallet.entity").Ewallet>;
    deposit(req: any, dto: DepositDto): Promise<import("./ewallet.entity").Ewallet>;
    withdraw(req: any, dto: WithdrawDto): Promise<import("./ewallet.entity").Ewallet>;
}
