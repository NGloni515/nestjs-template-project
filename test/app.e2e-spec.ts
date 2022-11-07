import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module';

describe('App 2e2 ', () => {
  beforeAll(async () => { 
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();
  })
  it.todo('should pass')
})