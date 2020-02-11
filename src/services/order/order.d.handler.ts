import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderHandler } from './order.handler';
import { OrderDto } from '../../dto/order.dto';
import { OrderEntity } from '../../models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderDHandler extends OrderHandler {
  constructor(
    @InjectRepository(OrderEntity)
    orderRepository: Repository<OrderEntity>,
    @Inject(ProductService)
    productService: ProductService,
  ) {
    super(orderRepository.manager, productService);
  }

  canHandleOrder(order: OrderDto): boolean {
    return order.Partner === 'D';
  }

  protected async createConcreteOrder(
    entityManager: EntityManager,
    baseOrder: OrderEntity,
    dto: OrderDto,
  ): Promise<OrderEntity> {
    return entityManager.save(baseOrder);
  }

  protected async validateConcreteOrder(dto: OrderDto): Promise<void> {
    if (!dto.LineItems.every(p => p.ProductType === 'Paid Search')) {
      throw new BadRequestException('Unsupported Product for Partner D');
    }
  }
}
