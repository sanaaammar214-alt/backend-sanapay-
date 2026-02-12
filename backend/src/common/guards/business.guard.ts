import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AccountType } from '../../user/user.entity';

@Injectable()
export class BusinessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.accountType !== AccountType.BUSINESS) {
      throw new ForbiddenException('Business account required');
    }

    return true;
  }
}