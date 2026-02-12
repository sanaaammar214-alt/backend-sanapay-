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
exports.EwalletController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const ewallet_service_1 = require("./ewallet.service");
const deposit_dto_1 = require("./dto/deposit.dto");
const withdraw_dto_1 = require("./dto/withdraw.dto");
const swagger_1 = require("@nestjs/swagger");
let EwalletController = class EwalletController {
    constructor(service) {
        this.service = service;
    }
    getMyWallet(req) {
        return this.service.getWalletByUserId(req.user.id);
    }
    deposit(req, dto) {
        return this.service.deposit(req.user.id, dto.amount);
    }
    withdraw(req, dto) {
        return this.service.withdraw(req.user.id, dto.amount);
    }
};
exports.EwalletController = EwalletController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EwalletController.prototype, "getMyWallet", null);
__decorate([
    (0, common_1.Post)('deposit'),
    (0, swagger_1.ApiBody)({ type: deposit_dto_1.DepositDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, deposit_dto_1.DepositDto]),
    __metadata("design:returntype", void 0)
], EwalletController.prototype, "deposit", null);
__decorate([
    (0, common_1.Post)('withdraw'),
    (0, swagger_1.ApiBody)({ type: withdraw_dto_1.WithdrawDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, withdraw_dto_1.WithdrawDto]),
    __metadata("design:returntype", void 0)
], EwalletController.prototype, "withdraw", null);
exports.EwalletController = EwalletController = __decorate([
    (0, swagger_1.ApiTags)('Ewallet'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('ewallet'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ewallet_service_1.EwalletService])
], EwalletController);
//# sourceMappingURL=ewallet.controller.js.map