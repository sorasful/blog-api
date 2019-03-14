import { INestApplication } from '@nestjs/common'
import { ArticleRepository } from './article.repository'
import { UserRepository } from '../user/user.repository'
import { CommentRepository } from '../comment/comment.repository'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { ArticleModule } from './article.module'
import { UserModule } from '../user/user.module'
import { CommentModule } from '../comment/comment.module'
import { AuthModule } from '../auth/auth.module'
import { setupDB } from '../utils/setup.tools'
import { getConnection } from 'typeorm'
import { User } from '../user/entity/user.entity'
import { Article } from './entity/article.entity'
import { UserPostInDTO } from '../user/user.dto';

describe('ArticleController (e2e)', () => {
  let app: INestApplication
  let article: Article = new Article()
  let user: User = new User()

  beforeAll(async () => {
    await setupDB()

    const moduleFixture = await Test.createTestingModule({
      imports: [UserModule, AuthModule, CommentModule, ArticleModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
      
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
        user = new User(res.body)
      })
  })

  afterAll(async () => {
    await app.get(CommentRepository).delete({})
    await app.get(ArticleRepository).delete({})
    await app.get(UserRepository).delete({})
    await app.close()
    await getConnection().close()
  })
  
  describe('Create article', async () => {
    it('/article/create', async () => {
      article = new Article({
        title: 'Article de raccoon',
        content: 'Les raccoon sont super mignon',
        author: user,
      })

      return request(app.getHttpServer())
        .post('/article')
        .send(article)
        .expect(201)
        .then(res => {
          article.articleId = res.body.articleId
        })
    })
  })

  describe('Get article by title', async () => {
    it('/article/getByTitle/:title', async () => {
      return request(app.getHttpServer())
        .get('/article/getByTitle/' + article.title)
        .expect(200)
        .then(res => {
          expect(res.body.author.firstName).toEqual('raccoon')
        })
    })
  })

  describe('Get articles by author', async () => {
    let listeArticle = []
    beforeAll(async () => {
      let index: number
      let articleToCreate: Article

      for (index = 1; index <= 5; index++) {
        articleToCreate = new Article({
          title: 'My raccoon is the best ' + index,
          content: 'Les raccoon sont les plus beaux animaux de la terre',
          comments: [],
          author: user,
        })

        listeArticle.push(articleToCreate)
      }

      return request(app.getHttpServer())
        .post('/article/createList')
        .send(listeArticle)
    })

    it('/article/author/:id', async () => {
      return request(app.getHttpServer())
        .get('/article/author/' + user.userId)
        .expect(200)
        .then(res => {
          expect(res.body.length).toEqual(6)
        })
    })
  })
})
