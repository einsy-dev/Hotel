import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param() { id }: any) {
    return this.usersService.findById(id);
  }

  @Post('create')
  async create(@Body() payload: any) {
    return this.usersService.create(payload);
  }
}
