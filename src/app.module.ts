import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { TravelModule } from './travel/travel.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        API_WEBPROVISE: Joi.string().uri().required(),
      }),
    }),
    CompanyModule,
    TravelModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      playground: true,
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
