import { Controller, Get, Param } from '@nestjs/common';
import { CompanyService } from 'src/company/services/company/company.service';
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Get('/:companyId')
  async getCompany(@Param('companyId') companyId: string) {
    return this.companyService.getDataCompanyAndChild(companyId);
  }
}
