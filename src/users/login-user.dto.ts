import { IsEmail, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  userID: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
