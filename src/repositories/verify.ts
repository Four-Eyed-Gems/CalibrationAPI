import { Request, Response } from 'express';
import { AuthService } from '../service';

export class verifyRepository {

    // Routes will call repos, Repo will be a single responsibility class
    public static async verifyOTP(req: Request, res: Response) {
        try {
            // Write computing operations here
            return AuthService.verifyOTP(req, res);
        } catch (err) {
            return err;
        }
    }
}
