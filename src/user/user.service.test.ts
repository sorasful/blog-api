import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('ArticleService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeAll(async () => {
    repository = {} as any;
    service = new UserService(repository);
  });

  describe('getById', () => {
    it('should call and return repository.findOne with id passed in param', async () => {
      const id = '5035c0aa-5c87-4d1f-8aac-862b334dbf02';
      const user = { name: 'toto', email: 'test@test.fr' };
      repository.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.getById(id);

      expect(result).toBe(user);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });
});
