import 'jest-extended';

import { ProductService } from './product.service';
import { ProductHandler } from './product.handler';
import { ProductDto } from '../../dto/product.dto';
import { EntityManager } from 'typeorm';
import { ProductEntity } from '../../models/product.entity';
import { OrderEntity } from '../../models/order.entity';
import { BadRequestException } from '@nestjs/common';

class MockProductHandler extends ProductHandler {
  canHandleProduct(productDto: ProductDto): boolean {
    return false;
  }

  async validateProduct(dto: ProductDto): Promise<void> {
    return undefined;
  }

  protected async createConcreteProduct(
    entityManager: EntityManager,
    baseProduct: ProductEntity,
    dto: ProductDto,
  ): Promise<ProductEntity> {
    return undefined;
  }
}

describe('ProductService', () => {
  describe('saveNewProduct (EntityManager, OrderEntity, ProductDto)', () => {
    it('Should throw BadRequest exception if all ProductHandlers can not handle the product type', async () => {
      const pHandler1 = new MockProductHandler();
      const pHandler1Spy = jest.spyOn(pHandler1, 'canHandleProduct');
      const pHandler2 = new MockProductHandler();
      const pHandler2Spy = jest.spyOn(pHandler2, 'canHandleProduct');
      const pHandler3 = new MockProductHandler();
      const pHandler3Spy = jest.spyOn(pHandler3, 'canHandleProduct');

      const productService = new ProductService([pHandler1, pHandler2, pHandler3]);

      await expect(
        productService.saveNewProduct({} as EntityManager, new OrderEntity(), new ProductDto()),
      ).rejects.toThrowError(BadRequestException);

      expect(pHandler1Spy).toBeCalledTimes(1);
      expect(pHandler2Spy).toBeCalledTimes(1);
      expect(pHandler3Spy).toBeCalledTimes(1);
    });
  });
});
