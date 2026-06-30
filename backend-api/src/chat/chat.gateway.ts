import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from '../notifications/notifications.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Map to store connected users: userId -> socketId
  private connectedUsers = new Map<string, string>();

  constructor(private notificationsService: NotificationsService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      this.server.emit('userOnline', userId);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.delete(userId);
      this.server.emit('userOffline', userId);
    }
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody()
    data: {
      senderId: string;
      receiverId: string;
      text: string;
      timestamp: Date;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const receiverSocketId = this.connectedUsers.get(data.receiverId);

    // Broadcast to the specific user's socket
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('receiveMessage', data);
    }

    // Trigger Firebase Push Notification
    // (In a real app, you'd fetch the receiver's FCM Token from the DB first)
    this.notificationsService.sendPushNotification(
      'MOCK_FCM_TOKEN_' + data.receiverId,
      'New Message',
      data.text,
      { senderId: data.senderId },
    );

    return { status: 'sent' };
  }
}
