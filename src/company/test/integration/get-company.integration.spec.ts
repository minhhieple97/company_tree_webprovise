import gql from 'graphql-tag';
import { IntegrationTestManager } from 'src/test/integration-test-manager';
import request from 'supertest-graphql';
import { testCompany } from '../data/dump-data-company';
import { Company } from 'src/company/models/company.model';

describe('getCompany', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('given that the company does already exist', () => {
    const companyId = testCompany.companyId;

    describe('when a getCompany query is executed', () => {
      let company: Company;

      beforeAll(async () => {
        const response = await request<{ company: Company }>(
          integrationTestManager.httpServer,
        )
          .query(
            gql`
              query {
                company($id: String!) {
                  id
                  parentId
                  cost
                  createdAt
                  children {
                    id
                    parentId
                    name
                    cost
                  }
                }
              }
            `,
          )
          .variables({ id: companyId });
        company = response.data.company[0];
      });

      test('return correct company id', () => {
        expect(company).toEqual({ id: testCompany.companyId });
      });
      test('return correct total cost of company', () => {
        expect(company).toEqual({ cost: testCompany.cost });
      });
    });
  });
});
