import { ChildEntity, Column } from 'typeorm';
import { ProductEntity } from './product.entity';
import { WebsiteDetails } from './website-details';

@ChildEntity()
export class ProductWebsiteEntity extends ProductEntity {
  @Column(() => WebsiteDetails)
  websiteDetails: WebsiteDetails;

  constructor(product?: ProductEntity) {
    super(product);
  }
}
