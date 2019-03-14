import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserUpdateInDTO, UserUpdateRoleInDTO } from './user.dto';
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
  it('should call and return service.update for a updated user', async () => {

      let userDTO = new UserUpdateInDTO();
      userDTO.email = 'tested@test.fr';
      userDTO.firstName = 'raccoon';
      userDTO.lastName = 'me';
      userDTO.mobilePhone = 'xxxx';
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

describe('Update user role', () => {
  it('should call and return service.updateRoleUser', async () => {
    const userUpdateDTO = new UserUpdateRoleInDTO() 
    userUpdateDTO.userId = '3a1066dc-28c9-485f-a2b4-85fc231d263c'
    userUpdateDTO.newRole = 'Autheur'

    service.updateRoleUser = jest.fn().mockResolvedValue(new User({ role: userUpdateDTO.newRole }))

    const result = await controller.updateRole(userUpdateDTO)

    expect(result.role).toBe(userUpdateDTO.newRole)
    expect(service.updateRoleUser).toHaveBeenCalledWith(userUpdateDTO.userId, userUpdateDTO.newRole)
  });
});
});
