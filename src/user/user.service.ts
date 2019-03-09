import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserPostInDTO, UserUpdateInDTO } from '../user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  /**
   * Returns a user identified by its id
   *
   * @param id - user id
   * @returns Resolves with User
   */
  async getById(id: string) {
    return this.userRepository.findOne(id);
  }

   /**
   * Insert a user
   *
   */
  async create(user: UserPostInDTO) {
    let user_to_persist = new User();
    user_to_persist.email = user.email;
    user_to_persist.firstName = user.first_name;
    user_to_persist.lastName = user.last_name;
    user_to_persist.mobilePhone = user.mobile_phone;
    user_to_persist.password = user.password;

    return this.userRepository.insert(user_to_persist);
  }

     /**
   * Update a user
   *
   */
  async update(user: UserUpdateInDTO) {
    let user_to_update = await this.getById(user.id);
    user_to_update.email = user.email;
    user_to_update.firstName = user.first_name;
    user_to_update.lastName = user.last_name;
    user_to_update.mobilePhone = user.mobile_phone;
    user_to_update.password = user.password;

    return this.userRepository.save(user_to_update);
  }




}
