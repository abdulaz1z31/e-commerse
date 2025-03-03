import { Controller, Post, Get, Param } from '@nestjs/common';
import { Roles, UserID } from 'src/common/decorators';
import { OrderService, UserRoles } from 'src/domain';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @Roles(UserRoles.user)
  @ApiOperation({ summary: 'Yangi order yaratish' })
  @ApiResponse({ status: 201, description: 'Order created' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <JWT Token>',
    required: true,
  })
  createOrder(@UserID() id: string) {
    return this.orderService.createOrder(id);
  }

  @Get()
  @Roles(UserRoles.admin)
  @ApiOperation({ summary: 'Barcha orderlarni olish' })
  @ApiResponse({ status: 200, description: 'All orders fetched' })
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('user/:id')
  @Roles(UserRoles.user)
  @ApiOperation({ summary: 'userning barcha buyurtmalarini olish' })
  @ApiParam({ name: 'id', description: 'user id', example: '123' })
  @ApiResponse({ status: 200, description: 'User orders fetched' })
  getUserOrders(@UserID() id: string) {
    return this.orderService.getUserOrders(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'orderni id boyicha olish' })
  @ApiParam({ name: 'id', description: 'order id', example: '456' })
  @ApiResponse({ status: 200, description: 'Order details fetched' })
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
}
