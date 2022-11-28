import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../dto/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewUserDto, userSignIn } from '../dto/user/newUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  getUsers() {
    return [{ name: 'Await', age: 1 }];
  }
  async createUser(newUserDto: NewUserDto): Promise<void> {
    const { userName, password } = newUserDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      userName,
      password: hashPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username Already exits');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signUp(credentials: userSignIn): Promise<string> {
    const { userName, password } = credentials;
    const user: User = await this.userRepository.findOneBy({ userName });
    const isAuth = await bcrypt.compare(password, user.password);
    if (user && isAuth) {
      return 'Successfully login';
    }
    if (!user) {
      throw new UnauthorizedException('Error:Username / Password not match');
    }
  }
}
