import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() body: any) {
    return this.reservationService.addReservation(body);
  }
}
