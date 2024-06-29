import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './dto/products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(Product.name);

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      return newProduct.save();
    } catch (error) {
      if (error.name === 'CastError')
        throw new NotFoundException('Product not found');
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating product', {
        cause: new Error(),
      });
    }
  }

  async findAll(params?: FilterProductsDto) {
    try {
      if (params) {
        const filters: FilterQuery<Product> = {};
        const { limit, offset } = params;
        const { maxPrice, minPrice } = params;
        const { category } = params;
        const { name } = params;

        if (maxPrice && minPrice) {
          filters.price = { $gte: minPrice, $lte: maxPrice };
        }

        if (category) {
          filters.category = { $regex: category, $options: 'i' };
        }

        if (name) {
          filters.name = { $regex: name, $options: 'i' };
        }

        return await this.productModel
          .find(filters)
          .skip(offset)
          .limit(limit)
          .exec();
      }

      return await this.productModel.find().exec();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error getting products', {
        cause: new Error(),
      });
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).exec();

      if (!product) throw new Error('Not found');

      return product;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productModel
        .findByIdAndUpdate(id, { $set: updateProductDto }, { new: true })
        .exec();

      if (!product) throw new Error('Not found');
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);

      if (!product) throw new Error('Not found');

      await this.productModel.deleteOne({ _id: id });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
