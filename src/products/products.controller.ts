import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './dto/products.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('/csv')
  @ApiOperation({ summary: 'Get all products in csv format' })
  getAllInCsv(@Req() _req, @Res() res) {
    return this.productsService.csvProducts(res);
  }

  @Get('/:productId')
  @ApiOperation({ summary: 'Get a product by id' })
  findOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Patch('/:productId')
  @ApiOperation({ summary: 'Update a product' })
  update(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete('/:productId')
  @ApiOperation({ summary: 'Remove a product' })
  remove(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.remove(productId);
  }
}
