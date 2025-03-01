import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'

dotenv.config();

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const token = request.headers['authorization']?.split(' ')[1];
        if (!token) {
            new UnauthorizedException("Token not found")
        }
        try {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET ?? "loremipsumhellowo@00000155628bhgdgfghjkaudgafbgwdyuf")
            return decodeToken
        } catch (error) {
            new UnauthorizedException("UnAuthorized")
        }
    }
)


