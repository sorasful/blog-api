import { Inject, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

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
   * Returns a user identified by its id
   *
   * @param id - user id
   * @returns Resolves with User
   */
  async getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }});
  }

   /**
   * Insert a user
   *
   */
  async create(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  /**
   * Update a user
   *
   */
  async update(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  /**
   * Update a user role
   *
   */
  async updateRoleUser(userId: string, role: string) {
    return this.userRepository.save(new User({ userId: userId, role: role }));
  }

  /*
  * Delete a user
  */
  async deleteById(id: string) {
    return this.userRepository.delete(id);
  }
}
