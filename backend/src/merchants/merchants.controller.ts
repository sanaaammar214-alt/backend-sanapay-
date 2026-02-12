import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MerchantsService } from './merchants.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpgradeMerchantDto } from './dto/upgrade-merchant.dto';

@ApiTags('Merchants')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('merchants')
export class MerchantsController {

  constructor(private readonly merchantsService: MerchantsService) {}

  @Post('upgrade')
  @ApiOperation({ summary: 'Upgrade personal account to business account' })
  @ApiResponse({ status: 201, description: 'Business account created successfully' })
  @ApiResponse({ status: 400, description: 'Already a business account' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async upgrade(
    @Request() req,
    @Body() dto: UpgradeMerchantDto,
  ) {
    return this.merchantsService.upgradeToBusiness(
      req.user.id,
      dto.businessName,
    );
  }
}
