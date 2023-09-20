import { Request, Response } from 'express';
import { AuthService } from '../service';

export class forgotPasswordRepository {

    // Routes will call repos, Repo will be a single responsibility class
    public static async forgotPassword(req: Request, res: Response) {
        try {
            // Write computing operations here
            return AuthService.forgotPassword(req, res);
        } catch (err) {
            return err;
        }
    }
}
