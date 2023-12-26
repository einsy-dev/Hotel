import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async findOne(@Body() payload: any) {
    return this.usersService.findOne(payload);
  }

  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('create')
  async create(@Body() payload: any) {
    return this.usersService.create(payload);
  }

  @Put('update')
  async update(@Body() payload: any) {
    return this.usersService.update(payload);
  }

  @Delete('delete')
  async delete(@Body() payload: any) {
    return this.usersService.delete(payload);
  }
}
