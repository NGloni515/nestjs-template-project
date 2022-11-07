import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module';

describe('App 2e2 ', () => {
  let app: INestApplication;
  beforeAll(async () => {  
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));
    await app.init();
  })

  afterAll(() => {
    app.close();
  })
  
  it.todo('should pass')
  it.todo('should pass 2')
})