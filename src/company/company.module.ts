import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { ApiService } from 'src/api/services/api/api.service';
import { TravelService } from 'src/travel/services/travel.service';
import { CompaniesResolver } from './resolvers/company.resolver';

@Module({
  providers: [CompanyService, ApiService, TravelService, CompaniesResolver],
  exports: [CompanyService],
})
export class CompanyModule {}
