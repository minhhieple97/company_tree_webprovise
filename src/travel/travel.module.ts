import { Module } from '@nestjs/common';
import { TravelController } from './controllers/travel/travel.controller';
import { TravelService } from './services/travel/travel.service';
import { ApiService } from 'src/api/services/api/api.service';

@Module({
  controllers: [TravelController],
  providers: [TravelService, ApiService],
})
export class TravelModule {}
