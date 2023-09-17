import { Router, Request, Response } from 'express';
import { LoginRepository, RegisterRepository, RefrehTokenRepository } from '../repositories/index';
const router = Router({ mergeParams: true });
import authSchema from '../validation/auth.validate';
import { celebrate } from 'celebrate';
import { verifyToken } from '../middleware/index';


router.post('/login', celebrate(authSchema.SigninSchema), LoginRepository.login);
router.post('/register', celebrate(authSchema.SignupSchema), RegisterRepository.register);
router.post('/refreshToken', verifyToken, RefrehTokenRepository.refresh)

export default router;