import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() body: any) {
    const data = {
      userId: body.userId,
      hotelId: body.hotelId,
      roomId: body.roomId,
      dateStart: body.order.from,
      dateEnd: body.order.to,
    };
    return this.reservationService.addReservation(data);
  }
}
