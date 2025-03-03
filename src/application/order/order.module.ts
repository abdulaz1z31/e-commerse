import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { BasketModule } from '../basket/basket.module';
import { OrderEntity, OrderService } from 'src/domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    forwardRef(() => BasketModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
