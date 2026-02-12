import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BusinessGuard } from '../common/guards/business.guard'; // 👈 AJOUT
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';


@ApiTags('Payments')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {

  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('pay')
  @UseGuards(BusinessGuard) // 👈 AJOUT
  async pay(
    @Request() req,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentsService.pay(
      req.user.id,
      dto.merchantId,
      dto.amount,
    );
  }
}
