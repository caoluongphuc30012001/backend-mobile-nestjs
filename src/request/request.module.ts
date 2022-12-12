import { NoticeModule } from './../notice/notice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { Request, RequestSchema } from './schemas/request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }]),
    NoticeModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
