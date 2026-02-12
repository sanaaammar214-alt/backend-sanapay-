import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from './merchant.entity';
import { User } from '../user/user.entity';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant, User])],
  providers: [MerchantsService],
  controllers: [MerchantsController],
})
export class MerchantsModule {}
