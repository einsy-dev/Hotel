import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
  Put,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RoomService } from './room.service';
import { Multer } from 'src/config/multer.config';

@Controller('api')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get('rooms')
  async getRooms(@Query() { hotelId }) {
    return this.roomService.find(hotelId);
  }
  @Get('room/:id')
  async getRoom(@Param() { id }) {
    return this.roomService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Post('room')
  @UseInterceptors(Multer)
  async create(@Body() body, @UploadedFiles() files) {
    return await this.roomService.create(body, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Put('room/:id')
  @UseInterceptors(Multer)
  async update(@UploadedFiles() files, @Param() { id }, @Body() body) {
    body.images = Array.from(body.images).join('').split(',');
    if (files) {
      body.images = [...body.images, ...files.map((file) => file.filename)];
    }
    return this.roomService.update({ id, params: body });
  }
}
