import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateBasketDto {
  @ApiProperty({
    description: 'productning yangi soni',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
}
