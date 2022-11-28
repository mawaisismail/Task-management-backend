import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewUserDto } from '../dto/user/newUser.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Post()
  createUser(@Body() newUserDto: NewUserDto) {
    return this.userService.createUser(newUserDto);
  }
}
