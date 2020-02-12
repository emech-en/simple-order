import { ProductDto } from '../../dto/product.dto';
import { EntityManager } from 'typeorm';
import { OrderEntity } from '../../models/order.entity';
import { ProductWebsiteEntity } from '../../models/product.website.entity';
import { ProductEntity } from '../../models/product.entity';

export abstract class ProductHandler {
  abstract canHandleProduct(productDto: ProductDto): boolean;

  async createProduct(entityManager: EntityManager, order: OrderEntity, dto: ProductDto): Promise<ProductEntity> {
    const baseProduct = new ProductWebsiteEntity();
    baseProduct.productID = dto.ProductID;
    baseProduct.productType = dto.ProductType;
    baseProduct.category = dto.Category;
    baseProduct.notes = dto.Notes;
    baseProduct.order = order;

    const concreteProduct = await this.createConcreteProduct(baseProduct, dto);
    return await entityManager.save(concreteProduct);
  }

  abstract async validateProduct(dto: ProductDto): Promise<void>;

  protected abstract async createConcreteProduct(baseProduct: ProductEntity, dto: ProductDto): Promise<ProductEntity>;
}
