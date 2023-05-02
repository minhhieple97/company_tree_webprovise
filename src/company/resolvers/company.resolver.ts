import { Args, Query, Resolver } from '@nestjs/graphql';
import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';
import { GetCompanyDTO } from '../dto/get-company.dto';
@Resolver(() => [Company])
export class CompaniesResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company], { name: 'company', nullable: true })
  getCompany(@Args() getCompanyDTO: GetCompanyDTO): Promise<Company[]> {
    return this.companyService.getDataCompanyAndChildren(getCompanyDTO.id);
  }
}
