import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
