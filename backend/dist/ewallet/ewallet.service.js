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
exports.EwalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ewallet_entity_1 = require("./ewallet.entity");
const transaction_entity_1 = require("../transactions/transaction.entity");
let EwalletService = class EwalletService {
    constructor(ewalletRepo, txRepo) {
        this.ewalletRepo = ewalletRepo;
        this.txRepo = txRepo;
    }
    async createWallet(userId) {
        const wallet = this.ewalletRepo.create({
            userId,
            walletNumber: `WALLET-${Date.now()}`,
            balance: '0',
            totalDeposited: '0',
            totalWithdrawn: '0',
            currency: 'MAD',
            status: ewallet_entity_1.WalletStatus.ACTIVE,
        });
        return this.ewalletRepo.save(wallet);
    }
    async getWalletByUserId(userId) {
        let wallet = await this.ewalletRepo.findOne({ where: { userId } });
        if (!wallet) {
            wallet = await this.createWallet(userId);
        }
        return wallet;
    }
    async deposit(userId, amount) {
        const wallet = await this.getWalletByUserId(userId);
        if (wallet.status !== ewallet_entity_1.WalletStatus.ACTIVE) {
            throw new common_1.BadRequestException('Wallet not active');
        }
        const balanceBefore = parseFloat(wallet.balance);
        const balanceAfter = balanceBefore + amount;
        wallet.balance = balanceAfter.toFixed(2);
        wallet.totalDeposited = (parseFloat(wallet.totalDeposited) + amount).toFixed(2);
        await this.ewalletRepo.save(wallet);
        const tx = this.txRepo.create({
            type: transaction_entity_1.TransactionType.DEPOSIT,
            amount: amount.toFixed(2),
            status: transaction_entity_1.TransactionStatus.COMPLETED,
            description: 'Deposit',
            reference: `DEP-${Date.now()}`,
            balanceBefore: balanceBefore.toFixed(2),
            balanceAfter: balanceAfter.toFixed(2),
            walletId: wallet.id,
        });
        await this.txRepo.save(tx);
        return wallet;
    }
    async withdraw(userId, amount) {
        const wallet = await this.getWalletByUserId(userId);
        const balanceBefore = parseFloat(wallet.balance);
        if (balanceBefore < amount) {
            throw new common_1.BadRequestException('Insufficient balance');
        }
        const balanceAfter = balanceBefore - amount;
        wallet.balance = balanceAfter.toFixed(2);
        wallet.totalWithdrawn = (parseFloat(wallet.totalWithdrawn) + amount).toFixed(2);
        await this.ewalletRepo.save(wallet);
        const tx = this.txRepo.create({
            type: transaction_entity_1.TransactionType.WITHDRAW,
            amount: amount.toFixed(2),
            status: transaction_entity_1.TransactionStatus.COMPLETED,
            description: 'Withdraw',
            reference: `WTH-${Date.now()}`,
            balanceBefore: balanceBefore.toFixed(2),
            balanceAfter: balanceAfter.toFixed(2),
            walletId: wallet.id,
        });
        await this.txRepo.save(tx);
        return wallet;
    }
    async getWalletByNumber(walletNumber) {
        const wallet = await this.ewalletRepo.findOne({
            where: { walletNumber },
        });
        if (!wallet) {
            throw new common_1.BadRequestException('Portefeuille introuvable');
        }
        return wallet;
    }
    async saveWallet(wallet) {
        return this.ewalletRepo.save(wallet);
    }
};
exports.EwalletService = EwalletService;
exports.EwalletService = EwalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ewallet_entity_1.Ewallet)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EwalletService);
//# sourceMappingURL=ewallet.service.js.map