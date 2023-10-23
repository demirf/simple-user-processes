import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserFilterDto } from '../dto/user.filter.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createDto: UserCreateDto) {
    const user = new User();
    user.name = createDto.name;

    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(filterDto: UserFilterDto) {
    return this.usersRepository.findBy(filterDto);
  }

  async remove(id: number) {
    await this.usersRepository.softDelete(id);
  }
}
