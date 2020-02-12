import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductHandler } from './product.handler';
import { ProductDto } from '../../dto/product.dto';
import { EntityManager } from 'typeorm';
import { OrderEntity } from '../../models/order.entity';
import { ProductEntity } from '../../models/product.entity';

@Injectable()
export class ProductService {
  constructor(@Inject(ProductHandler) private readonly productHandlers: ProductHandler[]) {}

  async saveNewProduct(entityManager: EntityManager, order: OrderEntity, product: ProductDto): Promise<ProductEntity> {
    for (const handler of this.productHandlers) {
      if (handler.canHandleProduct(product)) {
        await handler.validateProduct(product);
        return handler.createProduct(entityManager, order, product);
      }
    }
    throw new BadRequestException(`Unknown ProductType [${product.ProductType}]`);
  }
}
