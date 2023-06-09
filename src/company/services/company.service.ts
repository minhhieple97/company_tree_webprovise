import { Travel } from './../../travel/models/travel.model';
import { TravelService } from './../../travel/services/travel.service';
import { ApiService } from './../../api/services/api/api.service';
import { NotFoundException, Injectable } from '@nestjs/common';
import { Company } from '../models/company.model';

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
  async getDataCompanyAndChildren(companyId: string): Promise<Company[]> {
    const [companies, travels] = (await Promise.all([
      this.getDataCompaniesFromAPI(),
      this.travelService.getDataTravelsFromAPI(),
    ])) as [Company[], Travel[]];
    const companyIdx = companies.findIndex((el) => el.id === companyId);
    if (companyIdx === -1) {
      throw new NotFoundException(`company does not exist`);
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
    return [companyWithChildren];
  }

  getChildrenOfCompany(
    companyId: string,
    companies: Company[],
    travelsCost: Object,
  ): Company[] {
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
  calculateChildrenCost(children: Company[]): number {
    return children.reduce((acc: number, el) => {
      acc += el.cost;
      return acc;
    }, 0);
  }
}
