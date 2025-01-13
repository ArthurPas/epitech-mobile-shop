import { IsNotEmpty } from 'class-validator';

export class AddProductDto {
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  orderId: number;
  @IsNotEmpty()
  shopId: number;
  @IsNotEmpty()
  userId: number;
}
