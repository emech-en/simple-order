import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderEntity } from '../../models/order.entity';
import { OrderDto } from '../../dto/order.dto';
import { OrderHandler } from './order.handler';

@Injectable()
export class OrderService {
  constructor(@Inject(OrderHandler) private readonly orderHandlers: OrderHandler[]) {}

  async saveNewOrder(order: OrderDto): Promise<OrderEntity> {
    for (const handler of this.orderHandlers) {
      if (handler.canHandleOrder(order)) {
        await handler.validateOrder(order);
        return handler.createOrder(order);
      }
    }
    throw new BadRequestException(`Unknown Partner [${order.Partner}]`);
  }
}
