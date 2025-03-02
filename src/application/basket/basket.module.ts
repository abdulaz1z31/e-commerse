import { Module } from '@nestjs/common';
import { BasketService } from 'src/domain';
import { BasketController } from './controllers/basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BasketModule])],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
