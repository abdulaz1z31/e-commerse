import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreateBasketDto {
  @ApiProperty({
    description: 'product ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @ApiProperty({
    description: 'product soni',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  quantity: number;
}
