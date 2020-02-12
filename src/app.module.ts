import { Global, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './services/order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './models/order.entity';
import { OrderAHandler } from './services/order/order.a.handler';
import { OrderAEntity } from './models/order.a.entity';
import { ProductEntity } from './models/product.entity';
import { ProductWebsiteEntity } from './models/product.website.entity';
import { OrderHandler } from './services/order/order.handler';
import { OrderBHandler } from './services/order/order.b.handler';
import { ProductService } from './services/product/product.service';
import { OrderCHandler } from './services/order/order.c.handler';
import { ProductWebsiteHandler } from './services/product/product.website.handler';
import { ProductPaidSearchHandler } from './services/product/product.paid-search.handler';
import { ProductHandler } from './services/product/product.handler';
import { OrderDHandler } from './services/order/order.d.handler';
import { OrderCEntity } from './models/order.c.entity';
import { ProductPaidSearchEntity } from './models/product.paid-search.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'mysecretpassword',
      database: process.env.POSTGRES_DB || 'simple_order',
      entities: [OrderEntity, OrderAEntity, OrderCEntity, ProductEntity, ProductWebsiteEntity, ProductPaidSearchEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderAEntity,
      OrderCEntity,
      ProductEntity,
      ProductPaidSearchEntity,
      ProductWebsiteEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderAHandler,
    OrderBHandler,
    OrderCHandler,
    OrderDHandler,
    {
      provide: OrderHandler,
      useFactory: (...args) => {
        return [...args];
      },
      inject: [OrderAHandler, OrderBHandler, OrderCHandler, OrderDHandler],
    },
    ProductWebsiteHandler,
    ProductPaidSearchHandler,
    {
      provide: ProductHandler,
      useFactory: (...args) => {
        return [...args];
      },
      inject: [ProductWebsiteHandler, ProductPaidSearchHandler],
    },
    ProductService,
    OrderService,
  ],
  exports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderAEntity,
      OrderCEntity,
      ProductEntity,
      ProductPaidSearchEntity,
      ProductWebsiteEntity,
    ]),
  ],
})
export class AppModule {}
