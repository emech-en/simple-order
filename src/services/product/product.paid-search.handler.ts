import { ProductDto } from '../../dto/product.dto';
import { ProductHandler } from './product.handler';
import { BadRequestException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ProductEntity } from '../../models/product.entity';
import { ProductPaidSearchEntity } from '../../models/product.paid-search.entity';
import { CampaignDetails } from '../../models/campaign-details';

export class ProductPaidSearchHandler extends ProductHandler {
  canHandleProduct(dto: ProductDto): boolean {
    return dto.ProductType === 'Paid Search';
  }

  async validateProduct(dto: ProductDto): Promise<void> {
    if (dto.WebsiteDetails || !dto.AdWordCampaign) {
      throw new BadRequestException('Bad Product');
    }
  }

  protected async createConcreteProduct(
    entityManager: EntityManager,
    baseProduct: ProductEntity,
    dto: ProductDto,
  ): Promise<ProductEntity> {
    const p = new ProductPaidSearchEntity(baseProduct);

    p.adWordCampaign = new CampaignDetails();
    p.adWordCampaign.campaignAddressLine1 = dto.AdWordCampaign.CampaignAddressLine1;
    p.adWordCampaign.campaignName = dto.AdWordCampaign.CampaignName;
    p.adWordCampaign.campaignPostCode = dto.AdWordCampaign.CampaignPostCode;
    p.adWordCampaign.campaignRadius = dto.AdWordCampaign.CampaignRadius;
    p.adWordCampaign.destinationURL = dto.AdWordCampaign.DestinationURL;
    p.adWordCampaign.leadPhoneNumber = dto.AdWordCampaign.LeadPhoneNumber;
    p.adWordCampaign.offer = dto.AdWordCampaign.Offer;
    p.adWordCampaign.smsPhoneNumber = dto.AdWordCampaign.SMSPhoneNumber;
    p.adWordCampaign.uniqueSellingPoint1 = dto.AdWordCampaign.UniqueSellingPoint1;
    p.adWordCampaign.uniqueSellingPoint2 = dto.AdWordCampaign.UniqueSellingPoint2;
    p.adWordCampaign.uniqueSellingPoint3 = dto.AdWordCampaign.UniqueSellingPoint3;

    return entityManager.save(p);
  }
}
