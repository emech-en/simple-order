import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderHandler } from './order.handler';
import { OrderDto } from '../../dto/order.dto';
import { OrderEntity } from '../../models/order.entity';
import { OrderAEntity } from '../../models/order.a.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderAHandler extends OrderHandler {
  constructor(
    @InjectRepository(OrderAEntity)
    orderRepository: Repository<OrderAEntity>,
    @Inject(ProductService) productService: ProductService,
  ) {
    super(orderRepository.manager, productService);
  }

  canHandleOrder(order: OrderDto): boolean {
    return order.Partner === 'A';
  }

  async validateConcreteOrder(dto: OrderDto): Promise<void> {
    if (!dto.LineItems.every(p => p.ProductType === 'Website')) {
      throw new BadRequestException('Unsupported Product for Partner A');
    }

    ///
    /// I Assumed that All of the Contact fields are required for Partner A
    ///
    if (!dto.ContactEmail) {
      throw new BadRequestException('ContactEmail is Required for Partner A');
    }
    if (!dto.ContactFirstName) {
      throw new BadRequestException('ContactFirstName is Required for Partner A');
    }
    if (!dto.ContactLastName) {
      throw new BadRequestException('ContactLastName is Required for Partner A');
    }
    if (!dto.ContactMobile) {
      throw new BadRequestException('ContactMobile is Required for Partner A');
    }
    if (!dto.ContactPhone) {
      throw new BadRequestException('ContactPhone is Required for Partner A');
    }
    if (!dto.ContactTitle) {
      throw new BadRequestException('ContactTitle is Required for Partner A');
    }
  }

  protected async createConcreteOrder(
    entityManager: EntityManager,
    baseOrder: OrderEntity,
    dto: OrderDto,
  ): Promise<OrderEntity> {
    const order = new OrderAEntity(baseOrder);
    order.contactEmail = dto.ContactEmail;
    order.contactPhone = dto.ContactPhone;
    order.contactTitle = dto.ContactTitle;
    order.contactMobile = dto.ContactMobile;
    order.contactLastName = dto.ContactLastName;
    order.contactFirstName = dto.ContactFirstName;
    return entityManager.save(order);
  }
}
