import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { setupDB } from '../utils/setup.tools'
import { UserModule } from './user.module'
import { User } from './entity/user.entity'
import * as request from 'supertest'
import { AuthModule } from '../auth/auth.module'
import { getConnection } from 'typeorm'
import { UserRepository } from './user.repository'
import { Functions } from '../utils/function';
import { UserPostInDTO, UserUpdateInDTO, UserUpdateRoleInDTO } from './user.dto';

describe('UserNestController (e2e)', () => {
  let app: INestApplication
  let token: string = null
  const user: User = new User()

  beforeAll(async () => {
    await setupDB()

    const moduleFixture = await Test.createTestingModule({
      imports: [UserModule, AuthModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.get(UserRepository).delete({})
    await app.close()
    await getConnection().close()
  })


  describe('Create user', async () => {
    it('Create user', async () => {
      
      let userDTO = new UserPostInDTO();
      userDTO.email = 'tested@test.fr';
      userDTO.firstName = 'raccoon';
      userDTO.lastName = 'me';
      userDTO.password = 'myraccoonpassword';
      userDTO.mobilePhone = 'xxxx';
      
      return request(app.getHttpServer())
        .post('/user/create')
        .send(userDTO)
        .expect(201)
        .then(res => {
          expect(res.body.email).toEqual(userDTO.email)
          expect(res.body.firstName).toEqual(userDTO.firstName)
          expect(res.body.lastName).toEqual(userDTO.lastName)
          user.userId = res.body.userId
        })
    })
  })

  describe('Update user', async () => {
    it('Update user', async () => {
      let avatar: string = Functions.getRaccoonMignon();
      
      let userDTO = new UserUpdateInDTO();
      userDTO.email = 'tested@test.fr';
      userDTO.firstName = 'raccoon';
      userDTO.lastName = 'me';
      userDTO.mobilePhone = 'xxxx';
      userDTO.id = user.userId;
      userDTO.avatar = Buffer.from(avatar);
      
      return request(app.getHttpServer())
        .put('/user/update')
        .send(userDTO)
        .expect(200)
        .then(res => {
          expect(res.body.email).toEqual(userDTO.email)
          expect(res.body.firstName).toEqual(userDTO.firstName)
          expect(res.body.lastName).toEqual(userDTO.lastName)
          expect(Buffer.from(res.body.avatar.data)).toEqual(userDTO.avatar)
        })
    })
  })

  describe('Update user role', async () => {
    it('Update user role', async () => {
      let userDTO = new UserUpdateRoleInDTO();
      userDTO.userId = user.userId;
      userDTO.newRole = 'Autheur';
      
      return request(app.getHttpServer())
        .put('/user/updateRole')
        .send(userDTO)
        .expect(200)
        .then(res => {
          expect(res.body.role).toEqual('Autheur')
        })
    })
  })
})
