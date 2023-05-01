import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/api/services/api/api.service';
import { Travel } from 'src/travel/interface/travel.interface';

@Injectable()
export class TravelService {
  private resourceApiEndpoint = 'travels';
  constructor(private readonly apiService: ApiService) {}
  getDataTravelsFromAPI() {
    return this.apiService.getDataWebprovise(this.resourceApiEndpoint);
  }

  calculateCostOfAllEmployees(travels: Travel[], companyId: string): number {
    return travels.reduce((acc, el) => {
      if (el.companyId === companyId) {
        acc += parseFloat(el.price);
      }
      return acc;
    }, 0);
  }
}
