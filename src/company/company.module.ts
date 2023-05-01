import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company/company.controller';
import { CompanyService } from './services/company/company.service';
import { ApiService } from 'src/api/services/api/api.service';
import { TravelService } from 'src/travel/services/travel/travel.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, ApiService, TravelService],
})
export class CompanyModule {}
