import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  async createOrder(@Body() body: { userId: string; plan: string }) {
    return this.paymentsService.createSubscriptionOrder(body.userId, body.plan);
  }

  @Post('verify')
  async verifyPayment(
    @Body() body: { orderId: string; paymentId: string; signature: string },
  ) {
    return this.paymentsService.verifyPayment(
      body.orderId,
      body.paymentId,
      body.signature,
    );
  }
}
