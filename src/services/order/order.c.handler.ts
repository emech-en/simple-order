import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderHandler } from './order.handler';
import { OrderDto } from '../../dto/order.dto';
import { OrderEntity } from '../../models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { OrderCEntity } from '../../models/order.c.entity';

@Injectable()
export class OrderCHandler extends OrderHandler {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @Inject(ProductService)
    productService: ProductService,
  ) {
    super(orderRepository.manager, productService);
  }

  canHandleOrder(order: OrderDto): boolean {
    return order.Partner === 'C';
  }

  protected async createConcreteOrder(
    entityManager: EntityManager,
    baseOrder: OrderEntity,
    dto: OrderDto,
  ): Promise<OrderEntity> {
    const order = new OrderCEntity(baseOrder);
    order.exposureID = dto.ExposureID;
    order.udac = dto.UDAC;
    order.relatedOrderId = dto.RelatedOrder;
    return entityManager.save(order);
  }

  protected async validateConcreteOrder(dto: OrderDto): Promise<void> {
    if (!dto.LineItems.every(p => ['Website', 'Paid Search'].includes(p.ProductType))) {
      throw new BadRequestException('Unsupported Product for Partner C');
    }

    ///
    /// I Assumed that All of the partner C's additional fields are required for Partner A
    ///
    if (!dto.ExposureID) {
      throw new BadRequestException('ExposureID is Required for Partner C');
    }
    if (!dto.UDAC) {
      throw new BadRequestException('UDAC is Required for Partner C');
    }
    if (dto.RelatedOrder) {
      const relatedOrder = await this.orderRepository.findOne({ orderId: dto.RelatedOrder });
      if (!relatedOrder) {
        throw new BadRequestException('Related Order Not Found');
      }
    }
  }
}
