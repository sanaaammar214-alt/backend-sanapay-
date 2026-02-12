import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {

  @ApiProperty({
    example: 200,
    description: 'Montant à déposer'
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
