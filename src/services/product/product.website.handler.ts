import { ProductDto } from '../../dto/product.dto';
import { ProductHandler } from './product.handler';
import { BadRequestException } from '@nestjs/common';
import { ProductWebsiteEntity } from '../../models/product.website.entity';
import { WebsiteDetails } from '../../models/website-details';
import { EntityManager } from 'typeorm';
import { ProductEntity } from '../../models/product.entity';

export class ProductWebsiteHandler extends ProductHandler {
  canHandleProduct(dto: ProductDto): boolean {
    return dto.ProductType === 'Website';
  }

  async validateProduct(dto: ProductDto): Promise<void> {
    if (!dto.WebsiteDetails || dto.AdWordCampaign) {
      throw new BadRequestException('Bad Product');
    }
  }

  protected async createConcreteProduct(
    entityManager: EntityManager,
    baseProduct: ProductEntity,
    dto: ProductDto,
  ): Promise<ProductEntity> {
    const p = new ProductWebsiteEntity(baseProduct);

    p.websiteDetails = new WebsiteDetails();
    p.websiteDetails.templateId = dto.WebsiteDetails.TemplateId;
    p.websiteDetails.businessName = dto.WebsiteDetails.WebsiteBusinessName;
    p.websiteDetails.state = dto.WebsiteDetails.WebsiteState;
    p.websiteDetails.email = dto.WebsiteDetails.WebsiteEmail;
    p.websiteDetails.mobile = dto.WebsiteDetails.WebsiteMobile;
    p.websiteDetails.phone = dto.WebsiteDetails.WebsitePhone;
    p.websiteDetails.city = dto.WebsiteDetails.WebsiteCity;
    p.websiteDetails.postCode = dto.WebsiteDetails.WebsitePostCode;
    p.websiteDetails.addressLine1 = dto.WebsiteDetails.WebsiteAddressLine1;
    p.websiteDetails.addressLine2 = dto.WebsiteDetails.WebsiteAddressLine2;

    return entityManager.save(p);
  }
}
