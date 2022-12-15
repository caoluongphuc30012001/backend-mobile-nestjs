import { Notice } from './../notice/schemas/notice.schema';
import { NoticeType } from './../notice/enums/notice-type.enum';
import { NoticeService } from './../notice/notice.service';
import { ModifyInvoice } from './dtos/modify-invoice.dto';
import { Invoice, InvoiceDocument } from './schemas/invoice.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
    private readonly noticeService: NoticeService,
  ) {}

  async createInvoice(invoicePayload: Invoice): Promise<string> {
    try {
      const newInvoice = await this.invoiceModel.create(invoicePayload);
      //Thêm thông báo
      const data: any = await newInvoice.populate({
        path: 'room',
        populate: {
          path: 'user',
        },
      });
      const noticePayload: Notice = {
        noticeType: NoticeType.Invoice,
        invoice: newInvoice._id.toString(),
        description: 'Bạn có một hóa đơn mới',
        user: data.toObject().room?.user?._id,
      };
      const rs = await this.noticeService.createNotice(noticePayload);
      return rs;
    } catch (error) {
      return error.message;
    }
  }

  async updateInvoice(invoicePayload: ModifyInvoice): Promise<string> {
    try {
      await this.invoiceModel.findByIdAndUpdate(
        invoicePayload.invoiceId,
        invoicePayload,
      );
      return 'Update invoice successfully';
    } catch (error) {
      return error.message;
    }
  }

  async getInvoiceInformation(
    invoiceId: string,
  ): Promise<Invoice | string | null> {
    try {
      const data = await this.invoiceModel.findById(invoiceId).populate({
        path: 'room',
        select: 'image roomName address',
        populate: {
          path: 'user',
          select: '-password -email -role -birthDate',
        },
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async getInvoices(isPay: boolean): Promise<Invoice[] | string | null> {
    try {
      const data = await this.invoiceModel
        .find({ isPay: isPay })
        .populate('room');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async deleteInvoice(invoiceId: string): Promise<string> {
    try {
      await this.invoiceModel.findByIdAndDelete(invoiceId);
      return 'Delete Invoice successfully';
    } catch (error) {
      return error.message;
    }
  }
}
