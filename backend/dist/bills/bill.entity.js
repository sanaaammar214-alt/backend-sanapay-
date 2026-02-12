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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bill = exports.BillStatus = exports.BillCategory = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
var BillCategory;
(function (BillCategory) {
    BillCategory["ELECTRICITY"] = "ELECTRICITY";
    BillCategory["WATER"] = "WATER";
    BillCategory["INTERNET"] = "INTERNET";
    BillCategory["PHONE"] = "PHONE";
    BillCategory["GAS"] = "GAS";
    BillCategory["INSURANCE"] = "INSURANCE";
    BillCategory["SUBSCRIPTION"] = "SUBSCRIPTION";
    BillCategory["RENT"] = "RENT";
    BillCategory["OTHER"] = "OTHER";
})(BillCategory || (exports.BillCategory = BillCategory = {}));
var BillStatus;
(function (BillStatus) {
    BillStatus["PENDING"] = "PENDING";
    BillStatus["PAID"] = "PAID";
    BillStatus["OVERDUE"] = "OVERDUE";
    BillStatus["CANCELLED"] = "CANCELLED";
})(BillStatus || (exports.BillStatus = BillStatus = {}));
let Bill = class Bill {
};
exports.Bill = Bill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Bill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Bill.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Bill.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BillStatus, default: BillStatus.PENDING }),
    __metadata("design:type", String)
], Bill.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: BillCategory }),
    __metadata("design:type", String)
], Bill.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, name: 'dueDate' }),
    __metadata("design:type", Date)
], Bill.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Bill.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'accountNumber' }),
    __metadata("design:type", String)
], Bill.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'paidAt' }),
    __metadata("design:type", Date)
], Bill.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'transactionId' }),
    __metadata("design:type", String)
], Bill.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId' }),
    __metadata("design:type", Number)
], Bill.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], Bill.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], Bill.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Bill.prototype, "user", void 0);
exports.Bill = Bill = __decorate([
    (0, typeorm_1.Entity)('bills')
], Bill);
//# sourceMappingURL=bill.entity.js.map