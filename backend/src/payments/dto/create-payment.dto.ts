import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {

  @ApiProperty({ example: 1 })
  @IsNumber()
  merchantId: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsPositive()
  amount: number;
}
