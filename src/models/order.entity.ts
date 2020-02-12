import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('order')
@TableInheritance({
  column: {
    type: 'varchar',
    length: 128,
    name: 'type',
  },
})
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @Column({ type: 'varchar', length: 500 })
  partner: string;

  @Column({ type: 'varchar', length: 500 })
  typeOfOrder: string;

  @Column({ type: 'varchar', length: 500 })
  submittedBy: string;

  @Column({ type: 'varchar', length: 500 })
  companyID: string;

  @Column({ type: 'varchar', length: 500 })
  companyName: string;

  @OneToMany(
    () => ProductEntity,
    p => p.order,
    {
      cascade: ['insert'],
    },
  )
  products: ProductEntity[];

  constructor(order?: OrderEntity) {
    if (order) {
      this.orderId = order.orderId;
      this.partner = order.partner;
      this.typeOfOrder = order.typeOfOrder;
      this.submittedBy = order.submittedBy;
      this.companyID = order.companyID;
      this.companyName = order.companyName;
    }
  }
}
