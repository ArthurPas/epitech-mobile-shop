import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { OrderModule } from './order/order.module';
import { OrderlineModule } from './orderline/orderline.module';
import { InventoryModule } from './inventory/inventory.module';
import { BillingDetailsModule } from './billing-details/billing-details.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    ProductModule,
    ShopModule,
    OrderModule,
    OrderlineModule,
    InventoryModule,
    BillingDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
