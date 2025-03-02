import { Controller, Post, Get, Param } from '@nestjs/common';
import { UserID } from 'src/common/decorators';
import { OrderService } from 'src/domain';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@UserID() id: string) {
    return this.orderService.createOrder(id);
  }

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders(); // Admin only (add guard)
  }

  @Get('user/:id')
  getUserOrders(@UserID() id: string) {
    return this.orderService.getUserOrders(id);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
}
