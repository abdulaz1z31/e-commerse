import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketEntity } from '../entities/basket.entity';
import { CreateBasketDto } from '../dtos/create-basket.dto';
import { UpdateBasketDto } from '../dtos/update-basket.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketEntity)
    private basketRepository: Repository<BasketEntity>,
  ) {}

  async addToBasket(id: string, dto: CreateBasketDto) {
    const basket = this.basketRepository.create({
      user_id: id,
      ...dto,
    });
    return {
      message: 'Created',
      statusCode: 201,
      data: basket,
    };
  }

  async getBasket(id: string) {
    const baskets = await this.basketRepository.find({
      where: { user_id: id },
      relations: ['product'],
    });

    return {
      message: 'Success',
      statusCode: 200,
      data: baskets,
    };
  }

  async updateBasket(id: string, user_id: string, updateDto: UpdateBasketDto) {
    const basket = await this.basketRepository.findOne({
      where: { id, user_id },
    });
    if (!basket) throw new NotFoundException('Basket item not found');
    Object.assign(basket, updateDto);
    await this.basketRepository.save(basket);
    return {
      message: 'Updated',
      statusCode: 200,
      data: basket,
    };
  }

  async removeFromBasket(id: string, user_id: string) {
    const result = await this.basketRepository.delete({ id, user_id });
    if (result.affected === 0) {
      throw new NotFoundException('Basket item not found');
    }
    return {
      statusCode: 200,
      message: 'Deleted',
      data: {},
    };
  }

  async clearBasket(user_id: string) {
    await this.basketRepository.delete({ user_id });
    return {
      statusCode: 200,
      message: 'Deleted',
      data: {},
    };
  }
}
