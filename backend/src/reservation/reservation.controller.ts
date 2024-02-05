import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ObjectId } from 'mongoose';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @Get('/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['manager', 'admin'])
  async getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  @Get('/user/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['client', 'manager', 'admin'])
  async getAllUserReservations(@Param() { id }: { id: ObjectId }) {
    return this.reservationService.getAllUserReservations(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['client', 'admin'])
  async create(@Body() body: any) {
    const data = {
      userId: body.userId,
      hotelId: body.hotelId,
      roomId: body.roomId,
      dateStart: body.order.from,
      dateEnd: body.order.to,
    };
    return this.reservationService.addReservation(data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['client', 'manager'])
  async removeReservation(@Param() { id }: { id: ObjectId }) {
    return this.reservationService.removeReservation(id);
  }
}
