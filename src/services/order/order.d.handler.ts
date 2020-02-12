import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderHandler } from './order.handler';
import { OrderDto } from '../../dto/order.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderDHandler extends OrderHandler {
  constructor(
    @InjectEntityManager()
    entityManager: EntityManager,
    @Inject(ProductService)
    productService: ProductService,
  ) {
    super(entityManager, productService);
  }

  canHandleOrder(order: OrderDto): boolean {
    return order.Partner === 'D';
  }

  protected async validateConcreteOrder(dto: OrderDto): Promise<void> {
    if (!dto.LineItems.every(p => p.ProductType === 'Paid Search')) {
      throw new BadRequestException('Unsupported Product for Partner D');
    }
  }
}
