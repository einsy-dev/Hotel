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
import { HotelRoomService } from './hotel.room.servise';
import { ObjectId } from 'mongoose';
import { Hotel } from 'src/mongo/schemas/hotel.schema';
import { HotelRoom } from 'src/mongo/schemas/hotel.room.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SearchHotelParams } from './hotel.interface';
import { diskStorage } from 'multer';
import * as uuid from 'uuid';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('api')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly roomService: HotelRoomService,
  ) {}

  // Hotel

  @Get('hotels')
  async getHotels(@Query() query: SearchHotelParams) {
    return this.hotelService.find(query);
  }
  @Get('hotel/:id')
  async getHotel(@Param() { id }: { id: ObjectId }) {
    return this.hotelService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Post('hotel')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const filename: string = uuid.v4() + '.jpg';
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() body: Partial<Hotel>,
    @UploadedFiles() files: any,
  ): Promise<any> {
    return await this.hotelService.create(body, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Put('hotel/:id')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const filename: string = uuid.v4() + '.jpg';
          callback(null, filename);
        },
      }),
    }),
  )
  async update(
    @UploadedFiles() files: any,
    @Param() { id }: { id: ObjectId },
    @Body() body: Partial<Hotel>,
  ) {
    body.images = Array.from(body.images).join('').split(',');

    if (files) {
      body.images = [...body.images, ...files.map((file) => file.filename)];
    }

    return this.hotelService.update({ id, params: body });
  }

  // Hotel-room
  @Get('rooms/:id')
  async getHotelRooms(@Param() { id }: any) {
    return this.roomService.find(id);
  }
  @Get('room/:id')
  async getHotelRoom(@Param() { id }: { id: ObjectId }) {
    return this.roomService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Post('room')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const filename: string = uuid.v4() + '.jpg';
          callback(null, filename);
        },
      }),
    }),
  )
  async createRoom(
    @Body() body: Partial<Hotel>,
    @UploadedFiles() files: any,
  ): Promise<any> {
    return await this.roomService.create(body, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  @Put('room/:id')
  async updateRoom(
    @Param() { id }: { id: ObjectId },
    @Body() data: Partial<HotelRoom>,
  ) {
    return this.roomService.update({ id, params: data });
  }
}
