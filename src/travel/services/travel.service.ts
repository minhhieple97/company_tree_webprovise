import { Travel } from '../models/travel.model';
import { ApiService } from './../../api/services/api/api.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TravelService {
  private resourceApiEndpoint = 'travels';
  constructor(private readonly apiService: ApiService) {}
  getDataTravelsFromAPI() {
    return this.apiService.getDataWebprovise(this.resourceApiEndpoint);
  }

  generateTravelsCost(travels: Travel[]) {
    const travelCosts = {};
    travels.forEach((travel) => {
      if (travelCosts[travel.companyId]) {
        travelCosts[travel.companyId] += parseFloat(travel.price);
      } else {
        travelCosts[travel.companyId] = parseFloat(travel.price);
      }
    });
    return travelCosts;
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
