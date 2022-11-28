import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class NewUserDto {
  @IsString()
  userName: string;
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/, {
    message: 'Password Must be strong',
  })
  password: string;
}

export class userSignIn {
  userName: string;
  password: string;
}
