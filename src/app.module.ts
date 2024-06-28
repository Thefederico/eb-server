import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        DATABASE_URL: joi.string().required(),
      }),
    }),
    DatabaseModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
