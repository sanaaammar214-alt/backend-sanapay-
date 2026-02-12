import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpgradeMerchantDto {

  @ApiProperty({ example: 'Ma Société' })
  @IsString()
  @IsNotEmpty()
  businessName: string;
}
