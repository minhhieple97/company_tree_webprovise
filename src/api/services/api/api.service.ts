import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class ApiService {
  constructor(private readonly configService: ConfigService) {}
  async getDataWebprovise(resource: string) {
    const endPoint = `${this.configService.get<string>(
      'API_WEBPROVISE',
    )}/${resource}`;
    const response = await axios.get(endPoint);
    return response.data;
  }
}
