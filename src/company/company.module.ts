import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { ApiService } from 'src/api/services/api/api.service';
import { TravelService } from 'src/travel/services/travel.service';
import { CompaniesResolver } from './resolvers/company.resolver';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, ApiService, TravelService, CompaniesResolver],
})
export class CompanyModule {}
