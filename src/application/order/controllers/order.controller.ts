import { Controller, Post, Get, Param } from '@nestjs/common';
import { Roles, UserID } from 'src/common/decorators';
import { OrderService, UserRoles } from 'src/domain';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @Roles(UserRoles.user)
  createOrder(@UserID() id: string) {
    return this.orderService.createOrder(id);
  }

  @Get()
  @Roles(UserRoles.admin)
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('user/:id')
  @Roles(UserRoles.user)
  getUserOrders(@UserID() id: string) {
    return this.orderService.getUserOrders(id);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
}
