import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserUpdateInDTO } from '../user/user.dto';
import { Functions } from '../utils/function';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  let avatar: string = Functions.getRaccoonMignon();

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

describe('update', () => {
    it('should call and return repository.save for a updated user', async () => {

        let userDTO = new UserUpdateInDTO();
        userDTO.email = 'tested@test.fr';
        userDTO.first_name = 'raccoon';
        userDTO.last_name = 'me';
        userDTO.mobile_phone = 'xxxx';
        userDTO.id = '5035c0aa-5c87-4d1f-8aac-862b334dbf02';
        userDTO.avatar = Buffer.from(avatar);

        let user = new User();
        user.email = 'tested@t.fr';
        user.firstName = 'raccoon';
        user.lastName = 'me';
        user.mobilePhone = 'xxxx';
        user.userId = '5035c0aa-5c87-4d1f-8aac-862b334dbf02';
        user.avatar = Buffer.from(avatar);

        repository.save = jest.fn().mockResolvedValue(user);

        const result = await service.update(user);

        expect(result).toBe(user);
    });

});


});
