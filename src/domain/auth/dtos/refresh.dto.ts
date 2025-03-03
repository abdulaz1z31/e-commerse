import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cC...',
    description: 'Yangi access token olish uchun refresh token',
  })
  @IsNotEmpty()
  refresh_token: string;
}
