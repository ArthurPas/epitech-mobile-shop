import { Controller, Body, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductDto } from './dto/add-product-dto';
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Patch('/add')
  addToCart(@Body() addProductDto: AddProductDto) {
    return this.cartService.addToCart(addProductDto);
  }

  @Patch('/remove')
  removeFromCart(@Body() productId: number, orderId: number, shopId: number) {
    return this.cartService.removeFromCart(productId, orderId, shopId);
  }
}
