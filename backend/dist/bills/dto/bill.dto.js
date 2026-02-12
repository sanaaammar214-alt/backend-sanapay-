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
exports.UpdateBillDto = exports.CreateBillDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const bill_entity_1 = require("../bill.entity");
class CreateBillDto {
}
exports.CreateBillDto = CreateBillDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Electricity Bill - January 2026',
        description: 'Bill title',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Title must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(200, { message: 'Title must not exceed 200 characters' }),
    __metadata("design:type", String)
], CreateBillDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 450.50,
        description: 'Bill amount in MAD',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'Amount must be at least 1 MAD' }),
    (0, class_validator_1.Max)(100000, { message: 'Amount must not exceed 100,000 MAD' }),
    __metadata("design:type", Number)
], CreateBillDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ELECTRICITY',
        enum: bill_entity_1.BillCategory,
        description: 'Bill category',
    }),
    (0, class_validator_1.IsEnum)(bill_entity_1.BillCategory, { message: 'Invalid bill category' }),
    __metadata("design:type", String)
], CreateBillDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-02-15',
        description: 'Due date (YYYY-MM-DD)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBillDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Additional notes about this bill',
        description: 'Optional notes',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateBillDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ACC-123456',
        description: 'Account number',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateBillDto.prototype, "accountNumber", void 0);
class UpdateBillDto {
}
exports.UpdateBillDto = UpdateBillDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Electricity Bill - February 2026',
        description: 'Bill title',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], UpdateBillDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 475.00,
        description: 'Bill amount in MAD',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100000),
    __metadata("design:type", Number)
], UpdateBillDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'PENDING',
        enum: bill_entity_1.BillStatus,
        description: 'Bill status',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(bill_entity_1.BillStatus),
    __metadata("design:type", String)
], UpdateBillDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ELECTRICITY',
        enum: bill_entity_1.BillCategory,
        description: 'Bill category',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(bill_entity_1.BillCategory),
    __metadata("design:type", String)
], UpdateBillDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-02-20',
        description: 'Due date (YYYY-MM-DD)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateBillDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Updated notes',
        description: 'Optional notes',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateBillDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ACC-654321',
        description: 'Account number',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateBillDto.prototype, "accountNumber", void 0);
//# sourceMappingURL=bill.dto.js.map