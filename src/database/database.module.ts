import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'src/config/configuration';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof configuration>) => {
        return {
          uri: configService.database.url,
        };
      },
      inject: [configuration.KEY],
    })
  ],
  exports: [MongooseModule]
})
export class DatabaseModule { }
