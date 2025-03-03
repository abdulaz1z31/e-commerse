import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { BasketService } from 'src/domain/basket';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private basketService: BasketService,
  ) {}

  async createOrder(id: string) {
    const basketItems = (await this.basketService.getBasket(id)).data;
    if (!basketItems.length) throw new NotFoundException('Basket is empty');

    const orders = basketItems.map((item) =>
      this.orderRepository.create({
        user_id: id,
        product_id: item.product_id,
        quantity: item.quantity,
        status: 'pending',
      }),
    );

    await Promise.all([
      this.orderRepository.save(orders),
      this.basketService.clearBasket(id),
    ]);

    return {
      statusCode: 200,
      message: 'Created',
      data: orders,
    };
  }

  async getAllOrders() {
    const orders = await this.orderRepository.find({
      relations: ['user', 'product'],
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: orders,
    };
  }

  async getUserOrders(user_id: string) {
    const orders = await this.orderRepository.find({
      where: { user_id },
      relations: ['product'],
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: orders,
    };
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return {
      statusCode: 200,
      message: 'Success',
      data: order,
    };
  }
}
