import { Module } from '@nestjs/common';
import { BasketModule } from '../basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity, OrderService } from 'src/domain';
import { OrderController } from './controllers/order.controller';

@Module({
  imports: [BasketModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
