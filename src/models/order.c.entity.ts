import { OrderEntity } from './order.entity';
import { ChildEntity, Column, JoinColumn, ManyToOne } from 'typeorm';

@ChildEntity()
export class OrderCEntity extends OrderEntity {
  @Column({ type: 'varchar', length: 500 })
  udac: string;

  @Column({ type: 'varchar', length: 500 })
  exposureID: string;

  @Column({ type: 'varchar', nullable: true })
  relatedOrderId?: string;

  @ManyToOne(() => OrderEntity)
  @JoinColumn({ referencedColumnName: 'orderId', name: 'relatedOrderId' })
  relatedOrder?: OrderEntity;

  constructor(order?: OrderEntity) {
    super(order);
  }
}
