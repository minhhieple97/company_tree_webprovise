import { TravelService } from './../travel/services/travel.service';
import { ApiService } from './../api/services/api/api.service';
import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompaniesResolver } from './resolvers/company.resolver';

@Module({
  providers: [CompanyService, ApiService, TravelService, CompaniesResolver],
  exports: [CompanyService],
})
export class CompanyModule {}
