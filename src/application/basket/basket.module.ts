import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketController } from './controllers/basket.controller';
import { OrderModule } from '../order/order.module';
import { BasketEntity, BasketService } from 'src/domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketEntity]),
    forwardRef(() => OrderModule),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
