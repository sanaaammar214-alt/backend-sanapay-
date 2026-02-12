import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { EwalletService } from '../ewallet/ewallet.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private ewalletService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, ewalletService: EwalletService);
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
    getMe(userId: number): Promise<{
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
