import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdWordCampaignDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CampaignName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CampaignAddressLine1: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CampaignPostCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CampaignRadius: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  LeadPhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  SMSPhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  UniqueSellingPoint1: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  UniqueSellingPoint2: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  UniqueSellingPoint3: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Offer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  DestinationURL: string;
}
