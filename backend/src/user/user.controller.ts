import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
  async findAll(@Query() query) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  async findById(@Param() { id }) {
    return this.usersService.findById(id);
  }

  @Post('create')
  async create(@Body() payload) {
    return this.usersService.create(payload);
  }
}
