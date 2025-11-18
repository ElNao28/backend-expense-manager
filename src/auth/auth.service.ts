import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HandlerDataBaseErrors } from 'src/common/helpers/handler-database-errors.helper';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   *
   * @param createUserDto - data with the infomation for the new user(firstName, email, phone...)
   * @returns returns the new user created
   */
  public async createNewUser(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      const saveUser = await this.userRepository.save(user);
      return saveUser;
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  /**
   *
   * @returns returns an array with all users
   */
  public async getAllUsers() {
    try {
      const users = await this.userRepository.find({});
      return users;
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }

  /**
   *
   * @param id - Id of user that consulted
   * @returns returns one user if exists
   */
  public async getUserById(id: string) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser)
      throw new NotFoundException(`User with id: ${id} not found`);

    return foundUser;
  }

  /**
   *
   * @param id - id of user deleted
   * @returns returns empy data, only return status action
   */
  public async deleteUserById(id: string) {
    const deletedUser = await this.userRepository.softDelete({ id });

    if (deletedUser.affected === 0)
      throw new ConflictException(`Can't delete user with: ${id}`);

    return deletedUser;
  }

  /**
   *
   * @param id - id of user to update data
   * @param updateUserDto - data with information to update
   * @returns returns data of user updated
   */
  public async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!updateUser)
      throw new NotFoundException(`User with id: ${id} not found`);

    try {
      const saveUser = await this.userRepository.save(updateUser);
      return saveUser;
    } catch (error) {
      HandlerDataBaseErrors(error);
    }
  }
}
