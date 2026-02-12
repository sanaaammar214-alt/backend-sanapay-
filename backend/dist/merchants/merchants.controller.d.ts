import { MerchantsService } from './merchants.service';
import { UpgradeMerchantDto } from './dto/upgrade-merchant.dto';
export declare class MerchantsController {
    private readonly merchantsService;
    constructor(merchantsService: MerchantsService);
    upgrade(req: any, dto: UpgradeMerchantDto): Promise<import("./merchant.entity").Merchant>;
}
