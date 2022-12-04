import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { RoomModule } from './room/room.module';
import { InvoiceModule } from './invoice/invoice.module';
import 'dotenv/config';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://caoluongphuc:phuc0936155228@dacnpm.4paddkb.mongodb.net/mobile-backend?retryWrites=true',
    ),
    UserModule,
    RoomModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
