import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './create-user.dto';
import { UpdateUserDTO } from './update-user.dto';
import { User } from './users.entity';

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

  async create(user: CreateUserDTO) {
    await this.usersRepository.save(user);
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
