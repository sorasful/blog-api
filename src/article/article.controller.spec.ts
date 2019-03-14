import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { User } from '../user/entity/user.entity';
import { Article } from './entity/article.entity';

describe('Article Controller', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeAll(async () => {
    service = {} as any;
    controller = new ArticleController(service);
  });

  describe('getById', () => {
    it('should return the result of service.getById', async () => {
      const id = 'monId';
      const article = { name: 'toto' };
      service.getById = jest.fn().mockResolvedValue(article);

      const result = await controller.getById(id);

      expect(result).toBe(article);
      expect(service.getById).toHaveBeenCalledWith(id);
    });
  });


describe('findAllByUser', async () => {
  it('Should call and return repository.find with author id passed in param', async () => {
    const raccoonId = 'raccoonId'
    let listeArticles = []
    let index: number
    let autho = new User()

    for (index = 0; index < 5; index++) {
      listeArticles.push(new Article({ title: 'Article racc' + index, author: autho }))
    }

    service.findAllByUser = jest.fn().mockResolvedValue(listeArticles)
    
    const result = await service.findAllByUser(raccoonId)

    expect(result).toBe(listeArticles)
  })
})
});
