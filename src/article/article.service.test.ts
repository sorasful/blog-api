import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { UserService } from '../user/user.service';
import { ArticleUpdateInDTO } from "./article.dto";
import { Article } from "./entity/article.entity";
import { User } from '../user/entity/user.entity';
import { UserRepository } from 'src/user/user.repository';

describe('ArticleService', () => {
  let service: ArticleService;
  let repository: ArticleRepository;
  let userRepo: UserRepository;
  let userService:UserService;

  beforeAll(async () => {
    repository = {} as any;
    userRepo = {} as any;
    userService = new UserService(userRepo)
    service = new ArticleService(repository, userService);
  });

  describe('getById', () => {
    it('should call and return repository.findOne with id passed in param', async () => {
      const id = 'monId';
      const article = { name: 'toto' };
      repository.findOne = jest.fn().mockResolvedValue(article);

      const result = await service.getById(id);

      expect(result).toBe(article);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should call and return repository.findAll', async () => {
      let articles = {"count": {"content": "José est un poisson, comment va t-il se sortir de ce périple ?", "dislikes": 0, "likes": 10, "title": "Article 2: josé au kébab"}, "data": {"content": "José est un poisson, comment va t-il se sortir de ce périple ?", "dislikes": 0, "likes": 0, "title": "Article 1: josé à la pêche"}}

      repository.find = jest.fn().mockResolvedValue(articles);

      const result = await service.findAllPagined();

      expect(result).toEqual(articles);
    });
  });


    describe('create', () => {
    it('should call create function and persist a article with a user.', async () => {
      const id = 'monId';
      const article = { name: 'toto' };
      repository.findOne = jest.fn().mockResolvedValue(article);

      const result = await service.getById(id);

      expect(result).toBe(article);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });


describe('update', () => {
    it('should call and return repository.save for a updated article', async () => {

        let articleDTO = new ArticleUpdateInDTO();
        articleDTO.content = 'Jose est un poisson, mais pas n\'importe quel type de poisson, voici son histoire ... ';
        articleDTO.title = 'José le poisson';
        articleDTO.id = '5035c0aa-5c87-4d1f-8aac-862b334dbf02';

        let article = new Article();
        article.title = 'José le poisson';
        article.content = 'Jose est un poisson, mais pas n\'importe quel type de poisson, voici son histoire ... ';
        article.likes = 0;
        article.dislikes = 0;
        article.articleId = '16f2b690-22cf-4282-bace-532ac1d22fb0';

        service.update = jest.fn().mockResolvedValue(article);

        const result = await service.update(articleDTO);

        expect(result).toBe(article);
    });

});

describe('findAllByUser', async () => {
  it('Should call and return repository.find with author id passed in param', async () => {
    const author1Id = 'raccoonId'
    let listeArticles = []
    let index: number
    let autho = new User()

    for (index = 0; index < 5; index++) {
      listeArticles.push(new Article({ title: 'Article racc' + index, author: autho }))
    }

    repository.find = jest.fn().mockResolvedValue(listeArticles)
    userService.getById = jest.fn().mockResolvedValue(autho)
    
    const result = await service.findAllByUser(author1Id)

    expect(result).toBe(listeArticles)
  })
})

});
