import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    pay(req: any, dto: CreatePaymentDto): Promise<{
        message: string;
        amount: number;
        merchant: string;
    }>;
}
