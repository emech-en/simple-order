import { Column } from 'typeorm';

export class WebsiteDetails {
  @Column({ type: 'varchar', length: 500 })
  templateId: string;

  @Column({ type: 'varchar', length: 500 })
  businessName: string;

  @Column({ type: 'varchar', length: 500 })
  addressLine1: string;

  @Column({ type: 'varchar', length: 500 })
  addressLine2: string;

  @Column({ type: 'varchar', length: 500 })
  city: string;

  @Column({ type: 'varchar', length: 500 })
  state: string;

  @Column({ type: 'varchar', length: 500 })
  postCode: string;

  @Column({ type: 'varchar', length: 500 })
  phone: string;

  @Column({ type: 'varchar', length: 500 })
  email: string;

  @Column({ type: 'varchar', length: 500 })
  mobile: string;
}
