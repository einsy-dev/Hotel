import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: any) {
    return this.usersService.findOne({ _id: id, valid: false });
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
