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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../transactions/transaction.entity");
const bill_entity_1 = require("../bills/bill.entity");
const ewallet_entity_1 = require("../ewallet/ewallet.entity");
let AnalyticsService = class AnalyticsService {
    constructor(transactionRepository, billRepository, ewalletRepository) {
        this.transactionRepository = transactionRepository;
        this.billRepository = billRepository;
        this.ewalletRepository = ewalletRepository;
    }
    async getSummary(userId) {
        const wallet = await this.ewalletRepository.findOne({ where: { userId } });
        if (!wallet) {
            return this.getEmptySummary();
        }
        const totalDeposits = await this.transactionRepository
            .createQueryBuilder('transaction')
            .select('SUM(transaction.amount)', 'total')
            .where('transaction.walletId = :walletId', { walletId: wallet.id })
            .andWhere('transaction.type = :type', { type: transaction_entity_1.TransactionType.DEPOSIT })
            .andWhere('transaction.status = :status', { status: transaction_entity_1.TransactionStatus.COMPLETED })
            .getRawOne();
        const totalWithdrawals = await this.transactionRepository
            .createQueryBuilder('transaction')
            .select('SUM(transaction.amount)', 'total')
            .where('transaction.walletId = :walletId', { walletId: wallet.id })
            .andWhere('transaction.type = :type', { type: transaction_entity_1.TransactionType.WITHDRAW })
            .andWhere('transaction.status = :status', { status: transaction_entity_1.TransactionStatus.COMPLETED })
            .getRawOne();
        const transactionCount = await this.transactionRepository.count({
            where: { walletId: wallet.id },
        });
        const pendingBills = await this.billRepository.count({
            where: { userId, status: bill_entity_1.BillStatus.PENDING },
        });
        const paidBills = await this.billRepository.count({
            where: { userId, status: bill_entity_1.BillStatus.PAID },
        });
        const overdueBills = await this.billRepository.count({
            where: { userId, status: bill_entity_1.BillStatus.OVERDUE },
        });
        const totalBillAmount = await this.billRepository
            .createQueryBuilder('bill')
            .select('SUM(bill.amount)', 'total')
            .where('bill.userId = :userId', { userId })
            .andWhere('bill.status = :status', { status: bill_entity_1.BillStatus.PENDING })
            .getRawOne();
        return {
            balance: parseFloat(wallet.balance.toString()),
            totalDeposits: parseFloat(totalDeposits.total || '0'),
            totalWithdrawals: parseFloat(totalWithdrawals.total || '0'),
            transactionCount,
            bills: {
                pending: pendingBills,
                paid: paidBills,
                overdue: overdueBills,
                totalPendingAmount: parseFloat(totalBillAmount.total || '0'),
            },
        };
    }
    async getMonthlyAnalytics(userId) {
        const wallet = await this.ewalletRepository.findOne({ where: { userId } });
        if (!wallet) {
            return { months: [] };
        }
        const months = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
            const deposits = await this.transactionRepository
                .createQueryBuilder('transaction')
                .select('SUM(transaction.amount)', 'total')
                .where('transaction.walletId = :walletId', { walletId: wallet.id })
                .andWhere('transaction.type = :type', { type: transaction_entity_1.TransactionType.DEPOSIT })
                .andWhere('transaction.createdAt >= :start', { start: monthStart })
                .andWhere('transaction.createdAt <= :end', { end: monthEnd })
                .andWhere('transaction.status = :status', { status: transaction_entity_1.TransactionStatus.COMPLETED })
                .getRawOne();
            const withdrawals = await this.transactionRepository
                .createQueryBuilder('transaction')
                .select('SUM(transaction.amount)', 'total')
                .where('transaction.walletId = :walletId', { walletId: wallet.id })
                .andWhere('transaction.type = :type', { type: transaction_entity_1.TransactionType.WITHDRAW })
                .andWhere('transaction.createdAt >= :start', { start: monthStart })
                .andWhere('transaction.createdAt <= :end', { end: monthEnd })
                .andWhere('transaction.status = :status', { status: transaction_entity_1.TransactionStatus.COMPLETED })
                .getRawOne();
            months.push({
                month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
                deposits: parseFloat(deposits.total || '0'),
                withdrawals: parseFloat(withdrawals.total || '0'),
                net: parseFloat(deposits.total || '0') - parseFloat(withdrawals.total || '0'),
            });
        }
        return { months };
    }
    async getYearlyAnalytics(userId) {
        const wallet = await this.ewalletRepository.findOne({ where: { userId } });
        if (!wallet) {
            return { years: [] };
        }
        const years = [];
        const currentYear = new Date().getFullYear();
        for (let year = currentYear - 2; year <= currentYear; year++) {
            const yearStart = new Date(year, 0, 1);
            const yearEnd = new Date(year, 11, 31, 23, 59, 59);
            const deposits = await this.transactionRepository
                .createQueryBuilder('transaction')
                .select('SUM(transaction.amount)', 'total')
                .where('transaction.walletId = :walletId', { walletId: wallet.id })
                .andWhere('transaction.type = :type', { type: transaction_entity_1.TransactionType.DEPOSIT })
                .andWhere('transaction.createdAt >= :start', { start: yearStart })
                .andWhere('transaction.createdAt <= :end', { end: yearEnd })
                .andWhere('transaction.status = :status', { status: transaction_entity_1.TransactionStatus.COMPLETED })
                .getRawOne();
            const withdrawals = await this.transactionRepository
                .createQueryBuilder('transaction')
                .select('SUM(transaction.amount)', 'total')
                .where('transaction.walletId = :walletId', { walletId: wallet.id })
                .andWhere('transaction.type = :type', { type: transaction_entity_1.TransactionType.WITHDRAW })
                .andWhere('transaction.createdAt >= :start', { start: yearStart })
                .andWhere('transaction.createdAt <= :end', { end: yearEnd })
                .andWhere('transaction.status = :status', { status: transaction_entity_1.TransactionStatus.COMPLETED })
                .getRawOne();
            years.push({
                year: year.toString(),
                deposits: parseFloat(deposits.total || '0'),
                withdrawals: parseFloat(withdrawals.total || '0'),
                net: parseFloat(deposits.total || '0') - parseFloat(withdrawals.total || '0'),
            });
        }
        return { years };
    }
    async getCategoryAnalytics(userId) {
        const categories = await this.billRepository
            .createQueryBuilder('bill')
            .select('bill.category', 'category')
            .addSelect('COUNT(bill.id)', 'count')
            .addSelect('SUM(bill.amount)', 'total')
            .where('bill.userId = :userId', { userId })
            .groupBy('bill.category')
            .getRawMany();
        const formatted = categories.map((cat) => ({
            category: cat.category,
            count: parseInt(cat.count),
            total: parseFloat(cat.total || '0'),
            average: parseFloat(cat.total || '0') / parseInt(cat.count),
        }));
        const topBills = await this.billRepository.find({
            where: { userId },
            order: { amount: 'DESC' },
            take: 5,
        });
        return {
            categories: formatted,
            topBills: topBills.map((bill) => ({
                id: bill.id,
                title: bill.title,
                amount: parseFloat(bill.amount.toString()),
                category: bill.category,
                status: bill.status,
            })),
        };
    }
    getEmptySummary() {
        return {
            balance: 0,
            totalDeposits: 0,
            totalWithdrawals: 0,
            transactionCount: 0,
            bills: {
                pending: 0,
                paid: 0,
                overdue: 0,
                totalPendingAmount: 0,
            },
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(bill_entity_1.Bill)),
    __param(2, (0, typeorm_1.InjectRepository)(ewallet_entity_1.Ewallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map