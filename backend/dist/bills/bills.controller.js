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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsController = void 0;
const common_1 = require("@nestjs/common");
const pdfkit_1 = __importDefault(require("pdfkit"));
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bills_service_1 = require("./bills.service");
const bill_dto_1 = require("./dto/bill.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const bill_entity_1 = require("./bill.entity");
let BillsController = class BillsController {
    constructor(billsService) {
        this.billsService = billsService;
    }
    async create(req, createBillDto) {
        return this.billsService.create(req.user.id, createBillDto);
    }
    async findAll(req, status, category) {
        return this.billsService.findAll(req.user.id, status, category);
    }
    async findOne(req, id) {
        return this.billsService.findOne(req.user.id, id);
    }
    async update(req, id, updateBillDto) {
        return this.billsService.update(req.user.id, id, updateBillDto);
    }
    async remove(req, id) {
        return this.billsService.remove(req.user.id, id);
    }
    async pay(req, id) {
        return this.billsService.pay(req.user.id, id);
    }
    async downloadPdf(req, id, res) {
        const bill = await this.billsService.findOne(req.user.id, id);
        if (!bill) {
            return res.status(404).json({ message: 'Facture introuvable' });
        }
        const doc = new pdfkit_1.default({ size: 'A4', margin: 50 });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=facture-${bill.id}.pdf`);
        doc.pipe(res);
        doc
            .fontSize(26)
            .fillColor('#2563eb')
            .text('SanaPay', { align: 'left' });
        doc
            .fontSize(12)
            .fillColor('#555')
            .text(`Facture #${bill.id}`, { align: 'right' });
        doc.moveDown(2);
        doc
            .fontSize(12)
            .fillColor('#000')
            .text('Facturé à :', { underline: true });
        doc.moveDown(0.5);
        doc.text(`Utilisateur ID : ${req.user.id}`);
        doc.text(`Date émission : ${new Date(bill.createdAt).toLocaleDateString('fr-FR')}`);
        if (bill.dueDate) {
            doc.text(`Date échéance : ${new Date(bill.dueDate).toLocaleDateString('fr-FR')}`);
        }
        doc.moveDown(2);
        const tableTop = doc.y;
        doc
            .rect(50, tableTop, 500, 25)
            .fill('#2563eb');
        doc
            .fillColor('#ffffff')
            .fontSize(12)
            .text('Description', 60, tableTop + 7)
            .text('Montant', 400, tableTop + 7);
        doc.moveDown(2);
        doc
            .fillColor('#000')
            .fontSize(12)
            .text(bill.title, 60)
            .text(`${bill.amount.toFixed(2)} MAD`, 400);
        doc.moveDown(2);
        doc
            .fontSize(14)
            .fillColor('#000')
            .text('Total :', 350);
        doc
            .fontSize(18)
            .fillColor('#2563eb')
            .text(`${bill.amount.toFixed(2)} MAD`, 400, doc.y - 18);
        doc.moveDown(3);
        const statusText = bill.status === 'PAID'
            ? '✔ Facture Payée'
            : bill.status === 'OVERDUE'
                ? '⚠ Facture en retard'
                : 'En attente de paiement';
        const statusColor = bill.status === 'PAID'
            ? '#16a34a'
            : bill.status === 'OVERDUE'
                ? '#dc2626'
                : '#f59e0b';
        doc
            .fillColor(statusColor)
            .fontSize(12)
            .text(statusText, { align: 'center' });
        doc.moveDown(3);
        if (bill.notes) {
            doc
                .fillColor('#000')
                .fontSize(12)
                .text('Notes :', { underline: true });
            doc.moveDown(0.5);
            doc.text(bill.notes);
            doc.moveDown(2);
        }
        doc
            .fontSize(10)
            .fillColor('#888')
            .text('Merci d\'utiliser SanaPay.', { align: 'center' });
        doc.end();
    }
};
exports.BillsController = BillsController;
__decorate([
    (0, common_2.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new bill' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bill created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bill_dto_1.CreateBillDto]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "create", null);
__decorate([
    (0, common_2.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bills' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: bill_entity_1.BillStatus }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bills retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_2.Query)('status')),
    __param(2, (0, common_2.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "findAll", null);
__decorate([
    (0, common_2.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get bill by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bill ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bill retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bill not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "findOne", null);
__decorate([
    (0, common_2.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a bill' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bill ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bill updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bill not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot update paid bill' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_2.Param)('id')),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, bill_dto_1.UpdateBillDto]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "update", null);
__decorate([
    (0, common_2.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a bill' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bill ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bill deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bill not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete paid bill' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "remove", null);
__decorate([
    (0, common_2.Post)(':id/pay'),
    (0, swagger_1.ApiOperation)({ summary: 'Pay a bill' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bill ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bill paid successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bill not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Insufficient balance or invalid bill status' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "pay", null);
__decorate([
    (0, common_2.Get)(':id/pdf'),
    (0, swagger_1.ApiOperation)({ summary: 'Download bill as PDF' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bill ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'PDF generated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bill not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_2.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BillsController.prototype, "downloadPdf", null);
exports.BillsController = BillsController = __decorate([
    (0, swagger_1.ApiTags)('Bills'),
    (0, common_2.Controller)('bills'),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [bills_service_1.BillsService])
], BillsController);
//# sourceMappingURL=bills.controller.js.map