import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

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
});
