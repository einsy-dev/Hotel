import { HotelSchema } from './../mongo/schemas/hotel.schema';
import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRoomSchema } from 'src/mongo/schemas/hotel.room.schema';
import { HotelRoomService } from './hotel.room.servise';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Hotel', schema: HotelSchema },
      { name: 'HotelRoom', schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelController],
  providers: [HotelService, HotelRoomService],
})
export class HotelModule {}
