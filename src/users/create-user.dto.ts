import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  userID: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  nickname: string;
}
