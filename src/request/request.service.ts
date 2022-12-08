import { UpdateRequest } from './dtos/update-request.dto';
import { Request, RequestDocument } from './schemas/request.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: Model<RequestDocument>,
  ) {}

  async createRequest(requestPayload: Request): Promise<string> {
    try {
      await this.requestModel.create(requestPayload);
      return 'Create Request successfully';
    } catch (error) {
      return 'Something failed';
    }
  }

  async updateRequest(requestPayload: UpdateRequest): Promise<string> {
    try {
      await this.requestModel.findByIdAndUpdate(
        requestPayload.requestId,
        requestPayload,
      );
      return 'Update Request successfully';
    } catch (error) {
      return 'Something failed';
    }
  }

  async getListRequest(): Promise<string | Request[]> {
    try {
      const data = this.requestModel
        .find({})
        .select('room titleRequest')
        .populate({
          path: 'room',
          select: 'roomName',
        });
      return data;
    } catch (error) {
      return 'Something failed';
    }
  }

  async getRequestInformation(
    requestId: string,
  ): Promise<string | Request | null> {
    try {
      const data = this.requestModel
        .findById(requestId)
        .select('titleRequest description')
        .populate({
          path: 'room',
          select: 'roomName address image',
        });
      return data;
    } catch (error) {
      return 'Something failed';
    }
  }
  async deleteRequest(requestId: string): Promise<string> {
    try {
      await this.requestModel.findByIdAndDelete(requestId);
      return 'Delete request successfully';
    } catch (error) {
      return 'Something failed';
    }
  }
}
