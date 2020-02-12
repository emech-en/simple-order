import { OrderEntity } from './order.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class OrderAEntity extends OrderEntity {
  @Column({ type: 'varchar', length: 500 })
  contactFirstName: string;

  @Column({ type: 'varchar', length: 500 })
  contactLastName: string;

  @Column({ type: 'varchar', length: 500 })
  contactTitle: string;

  @Column({ type: 'varchar', length: 500 })
  contactPhone: string;

  @Column({ type: 'varchar', length: 500 })
  contactMobile: string;

  @Column({ type: 'varchar', length: 500 })
  contactEmail: string;

  constructor(order?: OrderEntity) {
    super(order);
  }
}
