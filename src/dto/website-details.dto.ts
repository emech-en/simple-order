import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WebsiteDetailsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  TemplateId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsiteBusinessName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsiteAddressLine1: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsiteAddressLine2: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsiteCity: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsiteState: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsitePostCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsitePhone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsiteEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  WebsiteMobile: string;
}
