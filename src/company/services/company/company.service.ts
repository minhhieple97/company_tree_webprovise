import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/api/services/api/api.service';
import {
  Children,
  Company,
  CompanyWithChildren,
} from 'src/company/interfaces/company.interface';
import { Travel } from 'src/travel/interface/travel.interface';
import { TravelService } from 'src/travel/services/travel/travel.service';

@Injectable()
export class CompanyService {
  private resourceApiEndpoint = 'companies';
  constructor(
    private readonly apiService: ApiService,
    private readonly travelService: TravelService,
  ) {}
  getDataCompaniesFromAPI(): Promise<Company[]> {
    return this.apiService.getDataWebprovise(this.resourceApiEndpoint);
  }
  async getDataCompanyAndChildren(
    companyId: string,
  ): Promise<CompanyWithChildren> {
    const [companies, travels] = (await Promise.all([
      this.getDataCompaniesFromAPI(),
      this.travelService.getDataTravelsFromAPI(),
    ])) as [Company[], Travel[]];
    const companyIdx = companies.findIndex((el) => el.id === companyId);
    if (companyIdx === -1) {
      throw new BadRequestException(`company does not exist`);
    }
    const company = companies[companyIdx];
    const travelsCost = this.travelService.generateTravelsCost(travels);
    const children = this.getChildrenOfCompany(
      companyId,
      companies,
      travelsCost,
    );
    const childrenCost = this.calculateChildrenCost(children);
    const employeesCost = travelsCost[companyId];
    const totalCost = childrenCost + employeesCost;
    const companyWithChildren = {
      ...company,
      cost: totalCost,
      children,
    };
    return companyWithChildren;
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
        const childrenCost = this.calculateChildrenCost(childrenOfCompany);
        const employeesCost = travelsCost[companyChild.id];
        const totalCost = childrenCost + employeesCost;
        children.push({
          ...companyChild,
          cost: totalCost,
          children: childrenOfCompany,
        });
      }
    }
    return children;
  }
  calculateChildrenCost(children: Children[]): number {
    return children.reduce((acc: number, el) => {
      acc += el.cost;
      return acc;
    }, 0);
  }
}
