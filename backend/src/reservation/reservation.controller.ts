import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['client', 'manager', 'admin'])
  async getReservations(@Query() query) {
    return this.reservationService.getReservations(query);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['client', 'admin'])
  async create(@Body() body) {
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
  async removeReservation(@Param() { id }) {
    return this.reservationService.removeReservation(id);
  }
}
