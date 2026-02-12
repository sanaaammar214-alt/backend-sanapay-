import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { EwalletModule } from '../ewallet/ewallet.module';
import { BillsModule } from '../bills/bills.module'; // ✅ AJOUTER CET IMPORT

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    EwalletModule,
    BillsModule, // ✅ AJOUTER ICI
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
