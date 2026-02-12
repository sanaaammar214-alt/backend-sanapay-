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
exports.BillsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bill_entity_1 = require("./bill.entity");
const ewallet_service_1 = require("../ewallet/ewallet.service");
let BillsService = class BillsService {
    constructor(billRepository, ewalletService) {
        this.billRepository = billRepository;
        this.ewalletService = ewalletService;
    }
    async create(userId, createBillDto) {
        const bill = this.billRepository.create({
            ...createBillDto,
            userId,
            status: bill_entity_1.BillStatus.PENDING,
        });
        const savedBill = await this.billRepository.save(bill);
        return {
            message: 'Bill created successfully',
            bill: this.formatBill(savedBill),
        };
    }
    async findAll(userId, status, category) {
        const query = { userId };
        if (status) {
            query.status = status;
        }
        if (category) {
            query.category = category;
        }
        const bills = await this.billRepository.find({
            where: query,
            order: { createdAt: 'DESC' },
        });
        const now = new Date();
        for (const bill of bills) {
            if (bill.status === bill_entity_1.BillStatus.PENDING &&
                bill.dueDate &&
                new Date(bill.dueDate) < now) {
                bill.status = bill_entity_1.BillStatus.OVERDUE;
                await this.billRepository.save(bill);
            }
        }
        return {
            bills: bills.map((bill) => this.formatBill(bill)),
            total: bills.length,
        };
    }
    async findOne(userId, billId) {
        const bill = await this.billRepository.findOne({
            where: { id: billId, userId },
        });
        if (!bill) {
            throw new common_1.NotFoundException('Bill not found');
        }
        return this.formatBill(bill);
    }
    async update(userId, billId, updateBillDto) {
        const bill = await this.billRepository.findOne({
            where: { id: billId, userId },
        });
        if (!bill) {
            throw new common_1.NotFoundException('Bill not found');
        }
        if (bill.status === bill_entity_1.BillStatus.PAID) {
            throw new common_1.BadRequestException('Cannot update a paid bill');
        }
        Object.assign(bill, updateBillDto);
        const updatedBill = await this.billRepository.save(bill);
        return {
            message: 'Bill updated successfully',
            bill: this.formatBill(updatedBill),
        };
    }
    async remove(userId, billId) {
        const bill = await this.billRepository.findOne({
            where: { id: billId, userId },
        });
        if (!bill) {
            throw new common_1.NotFoundException('Bill not found');
        }
        if (bill.status === bill_entity_1.BillStatus.PAID) {
            throw new common_1.BadRequestException('Cannot delete a paid bill');
        }
        await this.billRepository.remove(bill);
        return {
            message: 'Bill deleted successfully',
        };
    }
    async pay(userId, billId) {
        const bill = await this.billRepository.findOne({
            where: { id: billId, userId },
        });
        if (!bill) {
            throw new common_1.NotFoundException('Bill not found');
        }
        if (bill.status === bill_entity_1.BillStatus.PAID) {
            throw new common_1.BadRequestException('Bill is already paid');
        }
        if (bill.status === bill_entity_1.BillStatus.CANCELLED) {
            throw new common_1.BadRequestException('Cannot pay a cancelled bill');
        }
        const wallet = await this.ewalletService.getWalletByUserId(userId);
        const balance = parseFloat(wallet.balance.toString());
        const amount = parseFloat(bill.amount.toString());
        if (balance < amount) {
            throw new common_1.BadRequestException('Insufficient balance to pay this bill');
        }
        await this.ewalletService.withdraw(wallet.userId, amount);
        bill.status = bill_entity_1.BillStatus.PAID;
        bill.paidAt = new Date();
        bill.transactionId = `BILL-${Date.now()}`;
        await this.billRepository.save(bill);
        return {
            message: 'Bill paid successfully',
            bill: this.formatBill(bill),
            remainingBalance: balance - amount,
        };
    }
    formatBill(bill) {
        return {
            id: bill.id,
            title: bill.title,
            amount: parseFloat(bill.amount.toString()),
            status: bill.status,
            category: bill.category,
            dueDate: bill.dueDate,
            notes: bill.notes,
            accountNumber: bill.accountNumber,
            paidAt: bill.paidAt,
            transactionId: bill.transactionId,
            createdAt: bill.createdAt,
            updatedAt: bill.updatedAt,
        };
    }
    async countPaidBills(userId) {
        return this.billRepository.count({
            where: {
                userId: userId,
                status: bill_entity_1.BillStatus.PAID,
            },
        });
    }
};
exports.BillsService = BillsService;
exports.BillsService = BillsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bill_entity_1.Bill)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ewallet_service_1.EwalletService])
], BillsService);
//# sourceMappingURL=bills.service.js.map