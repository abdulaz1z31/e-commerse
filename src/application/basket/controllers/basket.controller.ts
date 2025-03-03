import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Roles, UserID } from 'src/common/decorators';
import {
  BasketService,
  CreateBasketDto,
  UpdateBasketDto,
  UserRoles,
} from 'src/domain';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Basket')
@ApiBearerAuth()
@Controller('baskets')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Post('add')
  @Roles(UserRoles.user)
  @ApiOperation({ summary: 'Savatga product qoshish' })
  @ApiBody({ type: CreateBasketDto })
  @ApiResponse({ status: 201, description: 'product savatga qoshildi' })
  addToBasket(@UserID() id: string, @Body() createBasketDto: CreateBasketDto) {
    return this.basketService.addToBasket(id, createBasketDto);
  }

  @Get()
  @Roles(UserRoles.user)
  @ApiOperation({ summary: 'user savatini olish' })
  @ApiResponse({ status: 200, description: 'Savat produclari' })
  getBasket(@UserID() id: string) {
    return this.basketService.getBasket(id);
  }

  @Patch('update/:id')
  @Roles(UserRoles.user)
  @ApiOperation({ summary: 'Savat productini update qilish' })
  @ApiParam({
    name: 'id',
    description: 'Savat product id si',
    example: 'abc123',
  })
  @ApiBody({ type: UpdateBasketDto })
  @ApiResponse({ status: 200, description: 'products updated' })
  updateBasket(
    @Param('id') id: string,
    @UserID() user_id: string,
    @Body() updateBasketDto: UpdateBasketDto,
  ) {
    return this.basketService.updateBasket(id, user_id, updateBasketDto);
  }

  @Delete('remove/:id')
  @Roles(UserRoles.user)
  @ApiOperation({ summary: 'savatni tozalash' })
  @ApiParam({
    name: 'id',
    description: 'savat product id si',
    example: 'abc123',
  })
  @ApiResponse({ status: 200, description: 'productni savatdan olib tashlash' })
  removeFromBasket(@Param('id') id: string, @UserID() user_id: string) {
    return this.basketService.removeFromBasket(id, user_id);
  }

  @Delete('clear')
  @Roles(UserRoles.user)
  @ApiOperation({ summary: 'Savatni tozalash' })
  @ApiResponse({ status: 200, description: 'Savat tozalandi' })
  clearBasket(@UserID() id: string) {
    return this.basketService.clearBasket(id);
  }
}
