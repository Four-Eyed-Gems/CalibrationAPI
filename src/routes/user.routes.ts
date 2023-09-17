import { Router, Request, Response } from 'express';
import { UserListRepository } from '../repositories';
const router = Router({ mergeParams: true });
import authSchema from '../validation/auth.validate';

import { celebrate } from 'celebrate';


router.get('/userlist', UserListRepository.getUserList);

export default router;