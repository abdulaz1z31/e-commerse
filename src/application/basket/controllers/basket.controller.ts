import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserID } from 'src/common/decorators';
import { BasketService, CreateBasketDto, UpdateBasketDto } from 'src/domain';

@Controller('baskets')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Post('add')
  addToBasket(@UserID() id: string, @Body() createBasketDto: CreateBasketDto) {
    return this.basketService.addToBasket(id, createBasketDto);
  }

  @Get()
  getBasket(@UserID() id: string) {
    return this.basketService.getBasket(id);
  }

  @Patch('update/:id')
  updateBasket(
    @Param('id') id: string,
    @UserID() user_id: string,
    @Body() updateBasketDto: UpdateBasketDto,
  ) {
    return this.basketService.updateBasket(id, user_id, updateBasketDto);
  }

  @Delete('remove/:id')
  removeFromBasket(@Param('id') id: string, @UserID() user_id: string) {
    return this.basketService.removeFromBasket(id, user_id);
  }

  @Delete('clear')
  clearBasket(@UserID() id: string) {
    return this.basketService.clearBasket(id);
  }
}
