import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportRequestModule } from './support-request/support-request.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    HotelModule,
    ReservationModule,
    SupportRequestModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
