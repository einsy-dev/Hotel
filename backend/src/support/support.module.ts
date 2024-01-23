import { SupportSchema } from './../mongo/schemas/support.schema';
import { Module } from '@nestjs/common';
import { SupportGateway } from './support.gateway';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportService } from './support.service';
import { MessageSchema } from 'src/mongo/schemas/message.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'Support', schema: SupportSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
  ],
  providers: [SupportGateway, SupportService],
})
export class SupportModule {}
