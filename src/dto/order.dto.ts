import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ProductDto } from './product.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderDto {
  ////
  //// Base Properties
  ////
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  OrderID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Partner: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  TypeOfOrder: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  SubmittedBy: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CompanyID: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  CompanyName: string;

  @ApiProperty({
    isArray: true,
    type: ProductDto,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  LineItems: ProductDto[];

  ////
  //// Partner C
  ////
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ExposureID?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  UDAC?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsUUID('4')
  @IsOptional()
  RelatedOrder?: string;

  ////
  //// Partner A
  ////
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ContactFirstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ContactLastName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ContactTitle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ContactPhone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ContactMobile?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ContactEmail?: string;
}
