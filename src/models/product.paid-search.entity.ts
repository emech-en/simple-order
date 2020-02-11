import { ChildEntity, Column } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CampaignDetails } from './campaign-details';

@ChildEntity()
export class ProductPaidSearchEntity extends ProductEntity {
  @Column(() => CampaignDetails)
  adWordCampaign: CampaignDetails;

  constructor(product?: ProductEntity) {
    super(product);
  }
}
