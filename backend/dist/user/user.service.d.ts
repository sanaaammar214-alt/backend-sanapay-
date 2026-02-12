import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateProfileDto, ChangePasswordDto } from './dto/user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getProfile(userId: number): Promise<{
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
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
    }>;
    changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
