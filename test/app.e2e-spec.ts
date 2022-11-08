import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum'
import { AuthDto } from '../src/auth/dto/auth.dto';

describe('App 2e2 ', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {  
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));
    await app.init();

    await app.listen(3333);

    prisma = app.get(PrismaService)

    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  })

  afterAll(() => {
    app.close();
  })
  
  describe('Auth',()=>{
    const dto: AuthDto = {
      email: 'angelonisrael@gmail.com',
      password: '12345678',
    }

    let accessToken: string;

    describe('Signup',()=>{
      it ('Should throw error email empty',() => {
        return pactum.spec()
          .post('/auth/signup',)
          .withBody({
            password: dto.password,
          })
          .expectStatus(400 ) 
      })
  
      it ('Should throw error password empty',() => {
        return pactum.spec()
          .post('/auth/signup',)
          .withBody({
            email: dto.email,
          })
          .expectStatus(400) 
      })
  
      it ('Should throw error if no body provided',() => {
        return pactum.spec()
          .post('/auth/signup',)
          .expectStatus(400) 
      })
  
      it ('should signup',() => {
        return pactum.spec()
          .post('/auth/signup',)
          .withBody(dto)
          .expectStatus(201) 
      })
    })

    describe('Signin',()=>{

      it ('Should throw error email empty',() => {
        return pactum.spec()
          .post('/auth/signin',)
          .withBody({
            password: dto.password,
          })
          .expectStatus(400 ) 
      })
  
      it ('Should throw error password empty',() => {
        return pactum.spec()
          .post('/auth/signin',)
          .withBody({
            email: dto.email,
          })
          .expectStatus(400) 
      })
  
      it ('Should throw error if no body provided',() => {
        return pactum.spec()
          .post('/auth/signin',)
          .expectStatus(400) 
      })

      it('should signin', () => {
        return pactum.spec()
          .post('/auth/signin',)
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token')
      })
    })
  })

  describe('User',()=>{
    describe('GET me',()=>{
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me',)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
      })
    })

    describe('Edit user',()=>{

    })
  })

  describe('Bookmarks',()=>{
    describe('Create Bookmark',()=>{
      
    })

    describe('Get Bookmarks',()=>{

    })

    describe('Get Bookmark by id',()=>{

    })

    describe('Edit Bookmark',()=>{

    })

    describe('Delete Bookmark ',()=>{

    })
  })

})