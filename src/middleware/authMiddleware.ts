import { Request, Response, NextFunction } from 'express';
import { environmentConfig, constant } from '../constants/index';
import jwt = require('jsonwebtoken');
import { ErrorResponse, InternalError } from '../utils/index';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return new ErrorResponse(res, 404, "Token not Found");

    const scheme = authorization.split(' ')[0];

    if (scheme !== 'Bearer') return new ErrorResponse(res, 401, "Invalid Token..!");

    const token = authorization.split(' ')[1];
    jwt.verify(token, environmentConfig.JWT_SECRET, async (err, payload: any) => {
      if (err?.message == "jwt expired") {
        return new ErrorResponse(res, 401, "Token Expired");
      }

      if (err && err?.message != "jwt expired") {
        return new ErrorResponse(res, 401, "Invalid Token");
      }

      if (payload) {
        let body: any = {
          _id: payload?._id,
          email: payload?.email
        }
        req.body = body;
        next()
      }
      else {
        return new InternalError(res);
      }
    });

  } catch (error) {
    return new ErrorResponse(res, 401, "Unauthorized..!")
  }
}

export const verifyBodyOTP = (req: Request, res: Response, next: NextFunction) => {
  try {
    let { otp } = req.body;
    otp = otp.toString();

    if (otp && otp?.length != constant.OTP_LENGTH || otp.trim() == "") return new ErrorResponse(res, 401, "Invalid OTP");
    if (!otp) return new ErrorResponse(res, 404, "otp not found");

    next()
  } catch (error) {
    return new InternalError(res)
  }
}