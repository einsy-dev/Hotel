import { Module } from '@nestjs/common';
import { SupportRequestController } from './support-request.controller';
import { SupportRequestService } from './support-request.service';
import { SupportRequestGateway } from './support-request.gateway';

@Module({
  controllers: [SupportRequestController],
  providers: [SupportRequestService, SupportRequestGateway],
})
export class SupportRequestModule {}
