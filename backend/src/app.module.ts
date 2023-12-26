import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportRequestModule } from './support-request/support-request.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    HotelModule,
    ReservationModule,
    SupportRequestModule,
    MongooseModule.forRoot(process.env.MONDO_DB),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
