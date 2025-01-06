import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Product } from 'src/product/entities/product.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(
    @Body() productId: number,
    orderId: number,
    shopId: number,
    userId: number,
  ) {
    return this.cartService.addToCart(productId, orderId, shopId, userId);
  }
  removeFromCart(@Body() productId: number, orderId: number, shopId: number) {
    return this.cartService.removeFromCart(productId, orderId, shopId);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
