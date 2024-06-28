import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from './dto/products.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(
    @Query() params: FilterProductsDto
  ) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  findOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Patch(':productId')
  update(@Param('productId', MongoIdPipe) productId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  remove(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.remove(productId);
  }
}
