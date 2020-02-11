import 'jest-extended';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { OrderEntity } from '../src/models/order.entity';
import { ProductEntity } from '../src/models/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderAEntity } from '../src/models/order.a.entity';
import { ProductWebsiteEntity } from '../src/models/product.website.entity';
import { ProductPaidSearchEntity } from '../src/models/product.paid-search.entity';
import { OrderCEntity } from '../src/models/order.c.entity';

import {
  BAD_PAID_SEARCH_PRODUCT,
  BAD_PRODUCT,
  BAD_WEBSITE_PRODUCT,
  PARTNER_A_CORRECT,
  PARTNER_A_INCOMPLETE_1,
  PARTNER_A_INCOMPLETE_2,
  PARTNER_A_INCOMPLETE_3,
  PARTNER_A_INCOMPLETE_4,
  PARTNER_A_INCOMPLETE_5,
  PARTNER_A_INCOMPLETE_6,
  PARTNER_A_WRONG_PRODUCT,
  PARTNER_B_CORRECT,
  PARTNER_B_WRONG_PRODUCT,
  PARTNER_C_CORRECT,
  PARTNER_C_WRONG_1,
  PARTNER_C_WRONG_2,
  PARTNER_C_WRONG_3,
  PARTNER_C_WRONG_RELATED_ORDER,
  PARTNER_D_CORRECT,
  PARTNER_D_WRONG_PRODUCT,
  PARTNER_UNKNOWN,
} from './test.data';

describe('* SIMPLE ORDER REST_API', () => {
  let app: INestApplication;
  let orderRepository: Repository<OrderEntity>;
  let productRepository: Repository<ProductEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    orderRepository = moduleFixture.get(getRepositoryToken(OrderEntity));
    productRepository = moduleFixture.get(getRepositoryToken(ProductEntity));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    // Remove all entities from test database
    await productRepository.delete({});
    await orderRepository.delete({});
  });

  afterAll(async () => {
    // Remove all entities from test database
    await productRepository.delete({});
    await orderRepository.delete({});

    // Close the application
    await app.close();
  });

  describe('* End Point /api/order [POST]', () => {
    it('Should return [400 BadRequest] when product object is wrong', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(BAD_PRODUCT)
        .expect(400);
    });

    it('Should return [400 BadRequest] in website product dont have websiteDetails', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(BAD_WEBSITE_PRODUCT)
        .expect(400);
    });

    it('Should return [400 BadRequest] in paid search product have websiteDetails', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(BAD_PAID_SEARCH_PRODUCT)
        .expect(400);
    });

    it('Should return [400 BadRequest] for an unknown partner', async () => {
      return request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_UNKNOWN)
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Unknown Partner [PARTNER_UNKNOWN]',
        });
    });

    it('Should return [400 BadRequest] for partner A incomplete request', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_A_INCOMPLETE_1)
        .expect(400);

      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_A_INCOMPLETE_2)
        .expect(400);

      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_A_INCOMPLETE_3)
        .expect(400);

      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_A_INCOMPLETE_4)
        .expect(400);

      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_A_INCOMPLETE_5)
        .expect(400);

      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_A_INCOMPLETE_6)
        .expect(400);
    });

    it('Should return [400 BadRequest] for partner A wrong product', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_A_WRONG_PRODUCT)
        .expect(400);
    });

    it('Should return [400 BadRequest] for partner B wrong product', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_B_WRONG_PRODUCT)
        .expect(400);
    });

    it('Should return [400 BadRequest] for partner C wrong order', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_C_WRONG_1)
        .expect(400);

      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_C_WRONG_2)
        .expect(400);

      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_C_WRONG_3)
        .expect(400);

      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_C_WRONG_RELATED_ORDER)
        .expect(400);
    });

    it('Should return [400 BadRequest] for partner D wrong product', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_D_WRONG_PRODUCT)
        .expect(400);
    });

    it('Should return [201 Created] for partner A correct request', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_A_CORRECT)
        .expect(201);

      const orders = await orderRepository.find();
      expect(orders).toHaveLength(1);
      expect(orders[0]).toBeInstanceOf(OrderAEntity);
      expect(orders[0].partner === 'A');

      const products = await productRepository.find();
      expect(products).toHaveLength(1);
      expect(products[0]).toBeInstanceOf(ProductWebsiteEntity);
      expect(products[0].productType === 'Website');
    });

    it('Should return [201 Created] for partner B correct request', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_B_CORRECT)
        .expect(201);

      const orders = await orderRepository.find();
      expect(orders).toHaveLength(1);
      expect(orders[0]).toBeInstanceOf(OrderEntity);
      expect(orders[0].partner === 'B');

      const products = await productRepository.find();
      expect(products).toHaveLength(2);

      const websiteProducts = await app.get(getRepositoryToken(ProductWebsiteEntity)).find();
      expect(websiteProducts).toHaveLength(1);

      const paidSearchProducts = await app.get(getRepositoryToken(ProductPaidSearchEntity)).find();
      expect(paidSearchProducts).toHaveLength(1);
    });

    it('Should return [201 Created] for partner C correct request with related order', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_C_CORRECT)
        .expect(201);

      const orders = await orderRepository.find();
      expect(orders).toHaveLength(1);
      expect(orders[0]).toBeInstanceOf(OrderCEntity);
      expect(orders[0].partner === 'C');

      const products = await productRepository.find();
      expect(products).toHaveLength(3);

      const websiteProducts = await app.get(getRepositoryToken(ProductWebsiteEntity)).find();
      expect(websiteProducts).toHaveLength(2);

      const paidSearchProducts = await app.get(getRepositoryToken(ProductPaidSearchEntity)).find();
      expect(paidSearchProducts).toHaveLength(1);

      await request(app.getHttpServer())
        .post('/api/order')
        .send({ ...PARTNER_C_CORRECT, RelatedOrder: orders[0].orderId })
        .expect(201);

      const newOrder = await app.get<Repository<OrderCEntity>>(getRepositoryToken(OrderCEntity)).findOneOrFail({
        where: { relatedOrderId: orders[0].orderId },
        relations: ['relatedOrder'],
      });
      expect(newOrder).not.toBeFalsy();
      expect(newOrder.relatedOrder).not.toBeFalsy();
      expect(newOrder.relatedOrder.orderId).toBe(orders[0].orderId);
    });

    it('Should return [201 Created] for partner D correct request', async () => {
      await request(app.getHttpServer())
        .post('/api/order')
        .send(PARTNER_D_CORRECT)
        .expect(201);

      const orders = await orderRepository.find();
      expect(orders).toHaveLength(1);
      expect(orders[0]).toBeInstanceOf(OrderEntity);
      expect(orders[0].partner === 'D');

      const products = await productRepository.find();
      expect(products).toHaveLength(1);
      expect(products[0]).toBeInstanceOf(ProductPaidSearchEntity);
    });
  });
});
