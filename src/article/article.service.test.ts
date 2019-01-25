import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { UserService } from '../user/user.service';

describe('ArticleService', () => {
  let service: ArticleService;
  let repository: ArticleRepository;
  let userService: UserService;

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



});
