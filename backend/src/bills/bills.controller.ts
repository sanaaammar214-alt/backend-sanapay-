import { Res } from '@nestjs/common';
import { Response } from 'express';
import PDFDocument from 'pdfkit';



import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { BillsService } from './bills.service';
import { CreateBillDto, UpdateBillDto } from './dto/bill.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BillStatus } from './bill.entity';

@ApiTags('Bills')
@Controller('bills')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bill' })
  @ApiResponse({ status: 201, description: 'Bill created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Request() req, @Body() createBillDto: CreateBillDto) {
    return this.billsService.create(req.user.id, createBillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bills' })
  @ApiQuery({ name: 'status', required: false, enum: BillStatus })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Bills retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Request() req,
    @Query('status') status?: BillStatus,
    @Query('category') category?: string,
  ) {
    return this.billsService.findAll(req.user.id, status, category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bill by ID' })
  @ApiParam({ name: 'id', description: 'Bill ID' })
  @ApiResponse({ status: 200, description: 'Bill retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Bill not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.billsService.findOne(req.user.id, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a bill' })
  @ApiParam({ name: 'id', description: 'Bill ID' })
  @ApiResponse({ status: 200, description: 'Bill updated successfully' })
  @ApiResponse({ status: 404, description: 'Bill not found' })
  @ApiResponse({ status: 400, description: 'Cannot update paid bill' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillDto,
  ) {
    return this.billsService.update(req.user.id, id, updateBillDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bill' })
  @ApiParam({ name: 'id', description: 'Bill ID' })
  @ApiResponse({ status: 200, description: 'Bill deleted successfully' })
  @ApiResponse({ status: 404, description: 'Bill not found' })
  @ApiResponse({ status: 400, description: 'Cannot delete paid bill' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Request() req, @Param('id') id: string) {
    return this.billsService.remove(req.user.id, id);
  }

  @Post(':id/pay')
  @ApiOperation({ summary: 'Pay a bill' })
  @ApiParam({ name: 'id', description: 'Bill ID' })
  @ApiResponse({ status: 200, description: 'Bill paid successfully' })
  @ApiResponse({ status: 404, description: 'Bill not found' })
  @ApiResponse({ status: 400, description: 'Insufficient balance or invalid bill status' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async pay(@Request() req, @Param('id') id: string) {
    return this.billsService.pay(req.user.id, id);
  }
@Get(':id/pdf')
@ApiOperation({ summary: 'Download bill as PDF' })
@ApiParam({ name: 'id', description: 'Bill ID' })
@ApiResponse({ status: 200, description: 'PDF generated successfully' })
@ApiResponse({ status: 404, description: 'Bill not found' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
async downloadPdf(
  @Request() req,
  @Param('id') id: string,
  @Res() res: Response,
) {
  const bill = await this.billsService.findOne(req.user.id, id);

  if (!bill) {
    return res.status(404).json({ message: 'Facture introuvable' });
  }

  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=facture-${bill.id}.pdf`,
  );

  doc.pipe(res);

  // =========================
  // HEADER
  // =========================
  doc
    .fontSize(26)
    .fillColor('#2563eb')
    .text('SanaPay', { align: 'left' });

  doc
    .fontSize(12)
    .fillColor('#555')
    .text(`Facture #${bill.id}`, { align: 'right' });

  doc.moveDown(2);

  // =========================
  // CLIENT INFO
  // =========================
  doc
    .fontSize(12)
    .fillColor('#000')
    .text('Facturé à :', { underline: true });

  doc.moveDown(0.5);

  doc.text(`Utilisateur ID : ${req.user.id}`);
  doc.text(
    `Date émission : ${new Date(bill.createdAt).toLocaleDateString('fr-FR')}`,
  );

  if (bill.dueDate) {
    doc.text(
      `Date échéance : ${new Date(bill.dueDate).toLocaleDateString('fr-FR')}`,
    );
  }

  doc.moveDown(2);

  // =========================
  // TABLE HEADER
  // =========================
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

  // =========================
  // TABLE CONTENT
  // =========================
  doc
    .fillColor('#000')
    .fontSize(12)
    .text(bill.title, 60)
    .text(`${bill.amount.toFixed(2)} MAD`, 400);

  doc.moveDown(2);

  // =========================
  // TOTAL
  // =========================
  doc
    .fontSize(14)
    .fillColor('#000')
    .text('Total :', 350);

  doc
    .fontSize(18)
    .fillColor('#2563eb')
    .text(`${bill.amount.toFixed(2)} MAD`, 400, doc.y - 18);

  doc.moveDown(3);

  // =========================
  // STATUS BADGE
  // =========================
  const statusText =
    bill.status === 'PAID'
      ? '✔ Facture Payée'
      : bill.status === 'OVERDUE'
      ? '⚠ Facture en retard'
      : 'En attente de paiement';

  const statusColor =
    bill.status === 'PAID'
      ? '#16a34a'
      : bill.status === 'OVERDUE'
      ? '#dc2626'
      : '#f59e0b';

  doc
    .fillColor(statusColor)
    .fontSize(12)
    .text(statusText, { align: 'center' });

  doc.moveDown(3);

  // =========================
  // NOTES
  // =========================
  if (bill.notes) {
    doc
      .fillColor('#000')
      .fontSize(12)
      .text('Notes :', { underline: true });
    doc.moveDown(0.5);
    doc.text(bill.notes);
    doc.moveDown(2);
  }

  // =========================
  // FOOTER
  // =========================
  doc
    .fontSize(10)
    .fillColor('#888')
    .text('Merci d\'utiliser SanaPay.', { align: 'center' });

  doc.end();
}



}
