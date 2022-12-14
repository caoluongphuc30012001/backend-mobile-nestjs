import { PayingInvoice } from './dtos/paying-invoice.dto';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:invoiceId')
  async getInvoiceInformation(
    @Param('invoiceId') invoiceId: string,
    @Res() res: Response,
  ) {
    const data = await this.invoiceService.getInvoiceInformation(invoiceId);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getInvoices(@Query('isPay') isPay: boolean, @Res() res: Response) {
    const data = await this.invoiceService.getInvoices(isPay);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  // @Roles(Role.Admin)
  async createInvoice(@Body() invoicePayload: Invoice, @Res() res: Response) {
    const data = await this.invoiceService.createInvoice(invoicePayload);
    res.status(HttpStatus.CREATED).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  // @Roles(Role.Admin)
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

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  // @Roles(Role.Admin)
  async deleteInvoice(
    @Body() deleteInvoice: DeleteInvoice,
    @Res() res: Response,
  ) {
    const data = await this.invoiceService.deleteInvoice(
      deleteInvoice.invoiceId,
    );
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('paying')
  async payingInvoice(
    @Body() invoicePayload: PayingInvoice,
    @Res() res: Response,
  ) {
    const data = await this.invoiceService.updateInvoice(invoicePayload);
    res.status(HttpStatus.OK).send({
      code: 0,
      data,
    });
  }
}
