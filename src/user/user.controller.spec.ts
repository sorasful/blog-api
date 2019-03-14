import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserUpdateInDTO } from './user.dto';
import { User } from './entity/user.entity';
import { Functions } from '../utils/function';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;
  let avatar: string = Functions.getRaccoonMignon();

  beforeAll(async () => {
    service = {} as any;
    controller = new UserController(service);
  });

  describe('getById', () => {
    it('should return the result of service.getById', async () => {
      const id = 'monId';
      const user = { name: 'toto' };
      service.getById = jest.fn().mockResolvedValue(user);

      const result = await controller.getById(id);

      expect(result).toBe(user);
      expect(service.getById).toHaveBeenCalledWith(id);
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

      service.update = jest.fn().mockResolvedValue(user);

      const result = await controller.update(userDTO);

      expect(result).toBe(user);
  });

});
});
