import { Request, Response } from 'express'
import { InternalError } from '../utils/index'
import { AuthService } from '../service'
export class RefrehTokenRepository {

    public static async refresh(req: Request, res: Response) {
        try {
            return AuthService.refreshTokenByToken(req, res);
        } catch (error) {
            return new InternalError(res)
            // return error
        }
    }
}