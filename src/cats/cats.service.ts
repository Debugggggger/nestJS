import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cats.entity';
import { Repository } from 'typeorm';
import { getConnection } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOneBy({ id });
  }

  async create(cat: Cat): Promise<void> {
    await this.catsRepository.save(cat);
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }

  async update(id: number, cat: Cat): Promise<void> {
    const exitCat = await this.catsRepository.findOneBy({ id });
    if (exitCat) {
      await getConnection()
        .createQueryBuilder()
        .update(Cat)
        .set({ name: cat.name, age: cat.age, breed: cat.breed })
        .where('id= :id', { id })
        .execute();
    }
  }
}
