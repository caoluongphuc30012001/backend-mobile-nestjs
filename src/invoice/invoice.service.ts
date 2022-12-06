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
  ) {}

  async createInvoice(invoicePayload: Invoice): Promise<string> {
    try {
      await this.invoiceModel.create(invoicePayload);
      return 'Create invoice successfully';
    } catch (error) {
      return 'Something failed';
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
      return 'Something failed';
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
      return 'Something failed';
    }
  }

  async getInvoices(isPay: boolean): Promise<Invoice[] | string | null> {
    try {
      const data = await this.invoiceModel
        .find({ isPay: isPay })
        .populate('room');
      return data;
    } catch (error) {
      return 'Something failed';
    }
  }

  async deleteInvoice(invoiceId: string): Promise<string> {
    try {
      await this.invoiceModel.findByIdAndDelete(invoiceId);
      return 'Delete Invoice successfully';
    } catch (error) {
      return 'Something failed';
    }
  }
}
