import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Multer } from 'src/config/multer.config';

@Controller('api')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('hotels')
  async getHotels(@Query() query) {
    return this.hotelService.find(query);
  }
  @Get('hotel/:id')
  async getHotel(@Param() { id }) {
    return this.hotelService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Post('hotel')
  @UseInterceptors(Multer)
  async create(@Body() body, @UploadedFiles() files) {
    return await this.hotelService.create(body, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Put('hotel/:id')
  @UseInterceptors(Multer)
  async update(@UploadedFiles() files, @Param() { id }, @Body() body) {
    body.images = Array.from(body.images).join('').split(',');

    if (files) {
      body.images = [...body.images, ...files.map((file) => file.filename)];
    }

    return this.hotelService.update({ id, params: body });
  }
}
