import { IsString, isString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  userID: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  nickname: string;
}
