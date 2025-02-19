import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

export interface RequestWithUser extends Request {
    authorization: any;
    user?: { UserID: number; Role: number };
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService
    ) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<number[]>('role', context.getHandler())
        if (requiredRole.length < 0) return true;
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;
        const authHeader = request.headers.authorization;

        if (!authHeader?.startsWith('Bearer ') && !authHeader?.split(' ')[1]) {
            throw new UnauthorizedException('Missing or invalid token');
        }
        try {
            const decoded = this.jwtService.verify(authHeader?.split(' ')[1], { secret: 'loremipsumhellowo@00000155628bhgdgfghjkaudgafbgwdyuf' })
            console.log("Decoded Token:", decoded);
            if (!decoded || !requiredRole.includes(decoded.Role)) {
                throw new ForbiddenException(`You do not have permission. Your role: ${decoded?.Role}, Required role: ${requiredRole}`);
            }
            return true;
        } catch (error) {
            console.log(error.message)
            throw new UnauthorizedException('Missing or invalid token', error.message);
        }

    }
}