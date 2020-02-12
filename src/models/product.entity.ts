import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('product')
@TableInheritance({
  column: {
    type: 'varchar',
    length: 128,
    name: 'type',
  },
})
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  productID: string;

  @Column({ type: 'varchar', length: 500 })
  productType: string;

  @Column({ type: 'varchar', length: 500 })
  notes: string;

  @Column({ type: 'varchar', length: 500 })
  category: string;

  @ManyToOne(
    () => OrderEntity,
    o => o.products,
  )
  order: OrderEntity;

  constructor(product?: ProductEntity) {
    if (product) {
      this.id = product.id;
      this.productID = product.productID;
      this.productType = product.productType;
      this.notes = product.notes;
      this.category = product.category;
      this.order = product.order;
    }
  }
}
