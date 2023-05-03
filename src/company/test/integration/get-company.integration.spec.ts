import { Company } from './../../models/company.model';
import { IntegrationTestManager } from './../../../test/integration-test-manager';
import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { testCompany } from '../data/dump-data-company';

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
              query GetCompany($companyId: String!) {
                company(id: $companyId) {
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
          .variables({ companyId });
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
