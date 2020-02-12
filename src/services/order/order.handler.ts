import { OrderEntity } from '../../models/order.entity';
import { OrderDto } from '../../dto/order.dto';
import { EntityManager } from 'typeorm';
import { ProductService } from '../product/product.service';

export abstract class OrderHandler {
  protected constructor(
    protected readonly entityManager: EntityManager,
    protected readonly productService: ProductService,
  ) {}

  abstract canHandleOrder(order: OrderDto): boolean;

  async validateOrder(dto: OrderDto): Promise<void> {
    await this.validateConcreteOrder(dto);
  }

  async createOrder(dto: OrderDto): Promise<OrderEntity> {
    return this.entityManager.transaction(async entityManager => {
      const baseOrder = new OrderEntity();
      baseOrder.companyID = dto.CompanyID;
      baseOrder.companyName = dto.CompanyName;
      baseOrder.partner = dto.Partner;
      baseOrder.submittedBy = dto.SubmittedBy;
      baseOrder.typeOfOrder = dto.TypeOfOrder;

      const concreteOrder = await this.createConcreteOrder(baseOrder, dto);
      await entityManager.save(concreteOrder);
      concreteOrder.products = [];
      for (const product of dto.LineItems) {
        const p = await this.productService.saveNewProduct(entityManager, concreteOrder, product);
        concreteOrder.products.push(p);
      }
      return concreteOrder;
    });
  }

  protected abstract async validateConcreteOrder(dto: OrderDto): Promise<void>;

  protected async createConcreteOrder(baseOrder: OrderEntity, dto: OrderDto): Promise<OrderEntity> {
    return baseOrder;
  }
}
