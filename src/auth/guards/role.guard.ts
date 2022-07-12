import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../requestWithUser.interface';
import { User } from 'src/user/user.schema';


const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {

            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user: User = request.user;

            return user?.role.includes(role);
        }
    }

    return mixin(RoleGuardMixin);
}

export default RoleGuard;