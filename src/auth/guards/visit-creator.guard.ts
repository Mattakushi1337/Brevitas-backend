import { CanActivate, ExecutionContext, Injectable, mixin, Type } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { VisitsService } from "src/visits/visits.service";
import RequestWithUser from "../requestWithUser.interface";
import Role from "./role.enum";


@Injectable()
export class VisitCreatorGuard implements CanActivate {
    constructor(
        private readonly productService: VisitsService,
        private readonly userService: UserService,
    ) { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const { user, params } = request;
        const visitId = Object(params.id)
        const visitChecked = await this.productService.getById(visitId)


        if (!user || !params) return false
        if (user?.role.includes(Role.Admin)) return true


        const userId = user._id
        const userChecked = await this.userService.getById(userId)

        
        return userChecked._id.toString() === visitChecked.user._id.toString();
    }
}