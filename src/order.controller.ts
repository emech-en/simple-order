import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OrderService } from './services/order/order.service';
import { OrderDto } from './dto/order.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/order.response.dto';

@Controller('/api/order')
@ApiTags('Order Api')
export class OrderController {
  constructor(
    @Inject(OrderService)
    private readonly orderService: OrderService,
  ) {}

  @Post('/')
  @ApiOperation({ description: 'Create Order and return orderID' })
  @ApiCreatedResponse({ description: 'Order has been created', type: OrderResponseDto })
  @ApiBadRequestResponse({ description: 'Order Object is not valid' })
  async postOrder(@Body() dto: OrderDto): Promise<OrderResponseDto> {
    const { orderId } = await this.orderService.saveNewOrder(dto);
    return { orderId };
  }
}
