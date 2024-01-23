import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportModule } from './support/support.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    HotelModule,
    ReservationModule,
    SupportModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './public', 'images'),
    }),
  ],
})
export class AppModule {}
