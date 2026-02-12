import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            wallet: {
                id: string;
                walletNumber: string;
                balance: number;
                currency: string;
            };
        };
    }>;
    getMe(req: any): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        isEmailVerified: boolean;
        createdAt: Date;
        wallet: {
            id: string;
            walletNumber: string;
            balance: number;
            currency: string;
            status: import("../ewallet/ewallet.entity").WalletStatus;
            totalDeposited: number;
            totalWithdrawn: number;
        };
    }>;
}
