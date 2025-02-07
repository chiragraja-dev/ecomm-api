import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from 'express';

export interface RequestWithUser extends Request {
    user?: { UserID: number; Role: number };
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<number>('role', context.getHandler())

        if (!requiredRole) return true;
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;
        if (!user || user.Role !== requiredRole) {
            throw new ForbiddenException('You do not have permission to access this resource.');
        }
        return true
    }
}