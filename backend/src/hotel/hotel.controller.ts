import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { SearchRoomsParams } from './hotel.interface';
import { HotelRoomService } from './hotel.room.servise';

@Controller('api')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly roomService: HotelRoomService,
  ) {}

  @Get('common/hotel-rooms')
  async getHotelRooms(@Query() query: SearchRoomsParams) {
    return this.hotelService.getHotelRooms(query);
  }
  @Get('common/hotel-rooms/:id')
  async getHotelRoom(@Param() { id }: { id: string }) {
    return this.hotelService.getHotelRoom(id);
  }

  @Post('admin/hotels')
  async create(@Body() data: any) {
    return this.hotelService.create(data);
  }
}
