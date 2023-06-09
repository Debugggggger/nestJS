import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDTO } from './update-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(uid: number): Promise<User> {
    return this.usersRepository.findOneBy({ uid });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(user: CreateUserDTO) {
    const { email, userID, name, password } = user;
    console.log(user);
    const isCatExist = await this.findUserByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await this.usersRepository.save({
      email,
      userID,
      name,
      password: hashedPassword,
    });
    console.log(createUser);
    return createUser;
  }

  async update(id: string, user: UpdateUserDTO) {
    const prevUser = await this.usersRepository.findOneBy({ userID: id });
    const userToUpdate = { ...prevUser, ...user };
    await this.usersRepository.save(userToUpdate);
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
