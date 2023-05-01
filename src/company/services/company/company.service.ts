import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/api/services/api/api.service';
import { Children, Company } from 'src/company/interfaces/company.interface';
import { Travel } from 'src/travel/interface/travel.interface';
import { TravelService } from 'src/travel/services/travel/travel.service';

@Injectable()
export class CompanyService {
  private resourceApiEndpoint = 'companies';
  constructor(
    private readonly apiService: ApiService,
    private readonly travelService: TravelService,
  ) {}
  getDataCompaniesFromAPI(): Promise<[Company]> {
    return this.apiService.getDataWebprovise(this.resourceApiEndpoint);
  }
  getDataTravels(): Promise<[Travel]> {
    return this.travelService.getDataTravelsFromAPI();
  }
  async getDataCompanyAndChildren(companyId: string) {
    const [companies, travels] = await Promise.all([
      this.getDataCompaniesFromAPI(),
      this.getDataTravels(),
    ]);
    const companyIdx = companies.findIndex((el) => el.id === companyId);
    if (companyIdx === -1) {
      throw new BadRequestException(`company does not exist`);
    }
    const travelsCost = this.travelService.generateTravelCost(travels);
    const children = this.getChildrenOfCompany(
      companyId,
      companies,
      travelsCost,
    );
    const cost = this.calculateCost(children, travelsCost, companyId);
    const company = {
      ...companies[companyIdx],
      cost,
      children,
    };
    return company;
  }

  getChildrenOfCompany(
    companyId: string,
    companies: Company[],
    travelsCost: Object,
  ): Children[] {
    const children = [];
    for (let i = 0; i < companies.length; i++) {
      const companyChild = companies[i];
      if (companyChild.parentId === companyId) {
        const childrenOfCompany = this.getChildrenOfCompany(
          companyChild.id,
          companies,
          travelsCost,
        );
        const totalCost = this.calculateCost(
          childrenOfCompany,
          travelsCost,
          companyChild.id,
        );
        children.push({
          ...companyChild,
          cost: totalCost,
          children: childrenOfCompany,
        });
      }
    }
    return children;
  }
  calculateCost(
    children: Children[],
    travelsCost: Object,
    companyId: string,
  ): number {
    const costOfAlChildren = children.reduce((acc: number, el) => {
      acc += el.cost;
      return acc;
    }, 0);
    const costOfAllEmployees = travelsCost[companyId];
    return costOfAlChildren + costOfAllEmployees;
  }
}
