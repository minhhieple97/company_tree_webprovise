import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
export class IntegrationTestManager {
  public httpServer: any;
  private app: INestApplication;
  async beforeAll(): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    this.app = moduleRef.createNestApplication();
    await this.app.init();
    this.httpServer = this.app.getHttpServer();
  }
  async afterAll() {
    await this.app.close();
  }
}
