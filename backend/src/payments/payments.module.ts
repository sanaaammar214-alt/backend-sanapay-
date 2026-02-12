import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Merchant } from '../merchants/merchant.entity';
import { EwalletModule } from '../ewallet/ewallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Merchant]),
    EwalletModule,
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
