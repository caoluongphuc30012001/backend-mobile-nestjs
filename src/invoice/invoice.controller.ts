import { DeleteInvoice } from './dtos/delete-invoice.dto';
import { ModifyInvoice } from './dtos/modify-invoice.dto';
import { Invoice } from './schemas/invoice.schema';
import { InvoiceService } from './invoice.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Res,
  Body,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('/:invoiceId')
  async getInvoiceInformation(
    @Param('invoiceId') invoiceId: string,
    @Res() res: Response,
  ) {
    console.log(invoiceId);
    const data = await this.invoiceService.getInvoiceInformation(invoiceId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }
  @Get('/')
  async getInvoices(@Query('isPay') isPay: boolean, @Res() res: Response) {
    const data = await this.invoiceService.getInvoices(isPay);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @Post('/')
  async createInvoice(@Body() invoicePayload: Invoice, @Res() res: Response) {
    const data = await this.invoiceService.createInvoice(invoicePayload);
    res.status(HttpStatus.CREATED).send({
      code: 0,
      data,
    });
  }

  @Put('/')
  async updateInvoice(
    @Body() invoicePayload: ModifyInvoice,
    @Res() res: Response,
  ) {
    const data = await this.invoiceService.updateInvoice(invoicePayload);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @Delete('/')
  async deleteRoom(@Body() deleteInvoice: DeleteInvoice, @Res() res: Response) {
    const data = await this.invoiceService.deleteInvoice(
      deleteInvoice.invoiceId,
    );
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }
}
