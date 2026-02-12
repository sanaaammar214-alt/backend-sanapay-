"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./transaction.entity");
const ewallet_service_1 = require("../ewallet/ewallet.service");
const bills_service_1 = require("../bills/bills.service");
let TransactionsService = class TransactionsService {
    constructor(transactionRepository, ewalletService, billsService) {
        this.transactionRepository = transactionRepository;
        this.ewalletService = ewalletService;
        this.billsService = billsService;
    }
    async deposit(userId, depositDto) {
        const { amount, description } = depositDto;
        const wallet = await this.ewalletService.deposit(userId, amount);
        return {
            message: 'Deposit successful',
            balance: parseFloat(wallet.balance),
        };
    }
    async withdraw(userId, withdrawDto) {
        const { amount } = withdrawDto;
        const wallet = await this.ewalletService.withdraw(userId, amount);
        return {
            message: 'Withdrawal successful',
            balance: parseFloat(wallet.balance),
        };
    }
    async getHistory(userId, limit = 50) {
        const wallet = await this.ewalletService.getWalletByUserId(userId);
        const transactions = await this.transactionRepository.find({
            where: { walletId: wallet.id },
            order: { createdAt: 'DESC' },
            take: limit,
        });
        return {
            total: transactions.length,
            transactions: transactions.map((t) => ({
                id: t.id,
                type: t.type,
                amount: parseFloat(t.amount),
                status: t.status,
                description: t.description,
                reference: t.reference,
                balanceBefore: t.balanceBefore
                    ? parseFloat(t.balanceBefore)
                    : null,
                balanceAfter: t.balanceAfter
                    ? parseFloat(t.balanceAfter)
                    : null,
                createdAt: t.createdAt,
            })),
        };
    }
    async getStats(userId) {
        const wallet = await this.ewalletService.getWalletByUserId(userId);
        const totalTransactions = await this.transactionRepository.count({
            where: { walletId: wallet.id },
        });
        const paidBills = await this.billsService.countPaidBills(userId);
        return {
            currentBalance: parseFloat(wallet.balance),
            totalDeposited: parseFloat(wallet.totalDeposited),
            totalWithdrawn: parseFloat(wallet.totalWithdrawn),
            totalTransactions,
            paidBills,
        };
    }
    async transfer(userId, dto) {
        const { walletNumber, amount, description } = dto;
        const senderWallet = await this.ewalletService.getWalletByUserId(userId);
        const senderBalance = parseFloat(senderWallet.balance);
        if (senderBalance < amount) {
            throw new common_1.BadRequestException('Solde insuffisant');
        }
        const receiverWallet = await this.ewalletService.getWalletByNumber(walletNumber);
        senderWallet.balance = (senderBalance - amount).toFixed(2);
        receiverWallet.balance = (parseFloat(receiverWallet.balance) + amount).toFixed(2);
        await this.ewalletService.saveWallet(senderWallet);
        await this.ewalletService.saveWallet(receiverWallet);
        const tx = this.transactionRepository.create({
            type: transaction_entity_1.TransactionType.TRANSFER,
            amount: amount.toFixed(2),
            status: transaction_entity_1.TransactionStatus.COMPLETED,
            description: description || 'Transfer',
            reference: `TRF-${Date.now()}`,
            walletId: senderWallet.id,
            balanceBefore: senderBalance.toFixed(2),
            balanceAfter: (senderBalance - amount).toFixed(2),
        });
        await this.transactionRepository.save(tx);
        return {
            message: 'Transfer effectué avec succès',
            balanceAfter: senderWallet.balance,
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ewallet_service_1.EwalletService,
        bills_service_1.BillsService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map