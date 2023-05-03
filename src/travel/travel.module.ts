import { ApiService } from './../api/services/api/api.service';
import { Module } from '@nestjs/common';
import { TravelService } from './services/travel.service';

@Module({
  controllers: [],
  providers: [TravelService, ApiService],
})
export class TravelModule {}
