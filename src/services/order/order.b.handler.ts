import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderHandler } from './order.handler';
import { OrderDto } from '../../dto/order.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderBHandler extends OrderHandler {
  constructor(
    @InjectEntityManager()
    entityManager: EntityManager,
    @Inject(ProductService)
    productService: ProductService,
  ) {
    super(entityManager, productService);
  }

  canHandleOrder(order: OrderDto): boolean {
    return order.Partner === 'B';
  }

  protected async validateConcreteOrder(dto: OrderDto): Promise<void> {
    if (!dto.LineItems.every(p => ['Website', 'Paid Search'].includes(p.ProductType))) {
      throw new BadRequestException('Unsupported Product for Partner B');
    }
  }
}
