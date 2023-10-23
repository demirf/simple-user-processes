import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserFilterDto } from "../dto/user.filter.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  post(@Body() createDto: UserCreateDto) {
    return this.userService.create(createDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Post('search')
  search(@Body() filterDto: UserFilterDto) {
    return this.userService.findOne(filterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.userService.remove(id);
  }
}
