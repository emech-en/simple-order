import { OrderController } from './order.controller';
import { OrderService } from './services/order/order.service';
import { OrderDto } from './dto/order.dto';

const mockOrderService = {
  async saveNewOrder(order: OrderDto) {
    return { orderId: 'some-id' };
  },
} as OrderService;

describe('OrderController', () => {
  const orderController = new OrderController(mockOrderService);

  describe('postOrder (order: OrderDTO)', () => {
    it('Should return {orderId: string}"', async () => {
      expect(await orderController.postOrder(new OrderDto())).toStrictEqual({ orderId: 'some-id' });
    });
  });
});
