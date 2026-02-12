import { UserService } from './user.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<{
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
        };
    }>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
