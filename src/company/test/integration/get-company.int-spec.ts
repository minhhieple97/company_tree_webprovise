import { Company } from './../../models/company.model';
import { AppModule } from './../../../app.module';
import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getGqlErrorMessage, getGqlErrorStatus } from '../gql-status';

describe('getCompany', () => {
  let app: INestApplication;
  const testCompany = {
    companyId: 'uuid-2',
    cost: 5199,
  };
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('given that the company does already exist', () => {
    const companyId = testCompany.companyId;
    let company: Company;
    beforeAll(async () => {
      const response = await request<{ company: Company }>(app.getHttpServer())
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
      expect(company.id).toEqual(testCompany.companyId);
    });
    test('return correct total cost of company', () => {
      expect(company.cost).toEqual(testCompany.cost);
    });
  });
  describe('given that the company does not exist', () => {
    let resStatus: number;
    let messageError: string;
    beforeAll(async () => {
      const { response } = await request<{ company: Company }>(
        app.getHttpServer(),
      )
        .query(
          gql`
            query GetCompany($companyId: String!) {
              company(id: $companyId) {
                id
              }
            }
          `,
        )
        .variables({ companyId: 'uuid-fake' });
      resStatus = getGqlErrorStatus(response);
      messageError = getGqlErrorMessage(response);
    });

    test('Should throw an error with status 404', () => {
      expect(resStatus).toBe(404);
    });
    test("Should throw an error with message 'company does not exist'", () => {
      expect(messageError).toBe('company does not exist');
    });
  });
});
