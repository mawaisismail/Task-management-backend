import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../dto/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserDto } from '../dto/user/newUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  getUsers() {
    return [{ name: 'Await', age: 1 }];
  }
  async createUser(newUserDto: NewUserDto): Promise<User> {
    const { userName, password } = newUserDto;
    const user = this.userRepository.create({
      userName,
      password,
    });
    await this.userRepository.save(user);
    return user;
  }
}
