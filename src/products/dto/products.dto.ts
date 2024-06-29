import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly category: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  readonly limit?: number;

  @IsOptional()
  @Min(0)
  readonly offset?: number;

  @IsOptional()
  @Min(0)
  readonly minPrice?: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  readonly maxPrice?: number;

  @IsOptional()
  readonly category: string;

  @IsOptional()
  readonly name: string;
}
