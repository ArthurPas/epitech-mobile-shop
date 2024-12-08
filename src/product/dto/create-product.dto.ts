import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  open_food_fact_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shopId: number;
}
