import { Module } from '@nestjs/common';
import { SupportRequestController } from './support-request.controller';
import { SupportRequestService } from './support-request.service';

@Module({
  controllers: [SupportRequestController],
  providers: [SupportRequestService]
})
export class SupportRequestModule {}
