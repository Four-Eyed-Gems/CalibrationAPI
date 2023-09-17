import { Router, Request, Response } from 'express';
import { LoginRepository, RegisterRepository, RefrehTokenRepository, verifyRepository } from '../repositories/index';

import authSchema from '../validation/auth.validate';
import { celebrate } from 'celebrate';
import { verifyToken, verifyBodyOTP } from '../middleware/index';

const router = Router({ mergeParams: true });


router.post('/login', celebrate(authSchema.SigninSchema), LoginRepository.login);
router.post('/register', celebrate(authSchema.SignupSchema), RegisterRepository.register);
router.post('/refreshToken', verifyToken, RefrehTokenRepository.refresh)
router.post('/verifyOTP', verifyBodyOTP, verifyRepository.verifyOTP);

export default router;