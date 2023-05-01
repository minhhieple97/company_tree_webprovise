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
  async getDataCompanyAndChild(companyId: string) {
    const [companies, travels] = await Promise.all([
      this.getDataCompaniesFromAPI(),
      this.getDataTravels(),
    ]);
    const companyIdx = companies.findIndex((el) => el.id === companyId);
    if (companyIdx === -1) {
      throw new BadRequestException(`company does not exist`);
    }
    const children = this.getChildrenOfCompany(companyId, companies, travels);
    const cost = this.calculateCost(children, travels, companyId);
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
    travels: Travel[],
  ): Children[] {
    const children = [];
    for (let i = 0; i < companies.length; i++) {
      const companyChild = companies[i];
      if (companyChild.parentId === companyId) {
        const childrenOfCompany = this.getChildrenOfCompany(
          companyChild.id,
          companies,
          travels,
        );
        const cost = this.calculateCost(
          childrenOfCompany,
          travels,
          companyChild.id,
        );
        children.push({
          ...companyChild,
          cost,
          children: childrenOfCompany,
        });
      }
    }
    return children;
  }
  calculateCost(
    children: Children[],
    travels: Travel[],
    companyId: string,
  ): number {
    const costOfAlChildren = children.reduce((acc: number, el) => {
      acc += el.cost;
      return acc;
    }, 0);
    const costOfAllEmployees = this.travelService.calculateCostOfAllEmployees(
      travels,
      companyId,
    );
    return costOfAlChildren + costOfAllEmployees;
  }
}
