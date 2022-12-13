import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import 'dotenv/config';
@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer() server: any;
  pushNotify(userId: string): void {
    this.server.emit(userId, {
      message: 'You have a new notification',
    });
  }
}
