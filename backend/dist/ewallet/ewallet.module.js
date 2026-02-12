"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EwalletModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ewallet_entity_1 = require("./ewallet.entity");
const transaction_entity_1 = require("../transactions/transaction.entity");
const ewallet_service_1 = require("./ewallet.service");
const ewallet_controller_1 = require("./ewallet.controller");
let EwalletModule = class EwalletModule {
};
exports.EwalletModule = EwalletModule;
exports.EwalletModule = EwalletModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ewallet_entity_1.Ewallet, transaction_entity_1.Transaction])],
        controllers: [ewallet_controller_1.EwalletController],
        providers: [ewallet_service_1.EwalletService],
        exports: [ewallet_service_1.EwalletService],
    })
], EwalletModule);
//# sourceMappingURL=ewallet.module.js.map