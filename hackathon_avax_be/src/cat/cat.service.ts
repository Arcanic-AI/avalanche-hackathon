import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}
  async create() {
    const new_cat = this.catRepository.create({
      name: 'meow meow' + Math.random(),
    });
    const save_cat = await this.catRepository.save(new_cat);
    console.log(new_cat);
    console.log(save_cat);
    return save_cat;
  }

  async findAll() {
    const cats = await this.catRepository.find();
    return cats;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }
}
