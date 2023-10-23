import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserFilterDto } from '../dto/user.filter.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createDto: UserCreateDto) {
    const user = new User();
    user.name = createDto.name;
    console.log(user);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(filterDto: UserFilterDto) {
    return this.usersRepository.findBy(filterDto);
  }

  async remove(id: number) {
    await this.usersRepository.softDelete(id);
  }

  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new PreconditionFailedException(errors);
    }
  }
}
