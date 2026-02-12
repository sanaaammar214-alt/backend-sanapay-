import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { EwalletService } from './ewallet.service';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Ewallet')
@ApiBearerAuth()
@Controller('ewallet')
@UseGuards(JwtAuthGuard)
export class EwalletController {
  constructor(private readonly service: EwalletService) {}

  @Get('me')
  getMyWallet(@Req() req) {
    return this.service.getWalletByUserId(req.user.id);
  }

  @Post('deposit')
  @ApiBody({ type: DepositDto })
  deposit(@Req() req, @Body() dto: DepositDto) {
    return this.service.deposit(req.user.id, dto.amount);
  }

  @Post('withdraw')
  @ApiBody({ type: WithdrawDto })
  withdraw(@Req() req, @Body() dto: WithdrawDto) {
    return this.service.withdraw(req.user.id, dto.amount);
  }
}
