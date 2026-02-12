import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawDto {

  @ApiProperty({
    example: 150,
    description: 'Montant à retirer'
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
