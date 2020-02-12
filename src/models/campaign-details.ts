import { Column } from 'typeorm';

export class CampaignDetails {
  @Column({ type: 'varchar', length: 500 })
  campaignName: string;

  @Column({ type: 'varchar', length: 500 })
  campaignAddressLine1: string;

  @Column({ type: 'varchar', length: 500 })
  campaignPostCode: string;

  @Column({ type: 'varchar', length: 500 })
  campaignRadius: string;

  @Column({ type: 'varchar', length: 500 })
  leadPhoneNumber: string;

  @Column({ type: 'varchar', length: 500 })
  smsPhoneNumber: string;

  @Column({ type: 'varchar', length: 500 })
  uniqueSellingPoint1: string;

  @Column({ type: 'varchar', length: 500 })
  uniqueSellingPoint2: string;

  @Column({ type: 'varchar', length: 500 })
  uniqueSellingPoint3: string;

  @Column({ type: 'varchar', length: 500 })
  offer: string;

  @Column({ type: 'varchar', length: 500 })
  destinationURL: string;
}
