import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewUserDto, userSignIn } from '../dto/user/newUser.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Post()
  createUser(@Body() newUserDto: NewUserDto): Promise<void> {
    return this.userService.createUser(newUserDto);
  }
  @Post('/signIn')
  signIn(@Body() credentials: userSignIn): Promise<{ accessToken: string }> {
    return this.userService.signUp(credentials);
  }
}
