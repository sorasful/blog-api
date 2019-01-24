import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let repository: ArticleRepository;

  beforeAll(async () => {
    repository = {} as any;
    service = new ArticleService(repository);
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
});
