import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WebsiteDetailsDto } from './website-details.dto';
import { AdWordCampaignDetailsDto } from './ad-word-campaign.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ProductID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ProductType: string;

  @ApiPropertyOptional()
  @IsString()
  Notes?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Category: string;

  @ApiPropertyOptional({
    type: WebsiteDetailsDto,
  })
  @IsOptional()
  WebsiteDetails?: WebsiteDetailsDto;

  @ApiPropertyOptional({
    type: AdWordCampaignDetailsDto,
  })
  @IsOptional()
  AdWordCampaign?: AdWordCampaignDetailsDto;
}
