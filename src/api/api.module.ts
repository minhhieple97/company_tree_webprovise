import { Module } from '@nestjs/common';
import { ApiService } from './services/api/api.service';

@Module({
  exports: [ApiService],
  providers: [ApiService],
})
export class ApiModule {}
