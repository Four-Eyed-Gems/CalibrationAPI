import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import environmentConfig from '../constants/environment.constant';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ErrorResponse, InternalError, SuccessResponse } from '../utils/index';
import { generateRefreshToken, generateAccessToken } from '../helpers/index';


export class AuthService {
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return new ErrorResponse(res, 404, "Credential Not Found");
      }

      const users = await User.findOne({ email: email });
      if (!users) {
        return new ErrorResponse(res, 404, "User Not Found");

      } else {
        const passwordMatched = bcrypt.compareSync(password, users.password);
        if (!passwordMatched) {
          return new ErrorResponse(res, 401, "Unauthorized");
        } else {
          let body: any = {
            _id: users?._id,
            email: users?.email
          }

          const accessToken = generateAccessToken(body)
          const refreshToken = generateRefreshToken(body)

          if (accessToken != null && refreshToken != null) {
            body["accessToken"] = accessToken;
            body["refreshToken"] = refreshToken;
            
            res.cookie("refreshToken", refreshToken, { httpOnly: true });
            return new SuccessResponse(res, body)
          }
          else {
            return new InternalError(res);
          }
        }
      }
    } catch (error: any) {
      return res.status(Number(error.code)).json(error);
    }
  }


  public static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const users = await User.findOne({ email: email });
      if (users) {
        return new ErrorResponse(res, 409, 'User already exist..!')
      } else {
        const hashPassword = await bcrypt.hashSync(password, 12);
        const newuser: any = await User.create({
          email,
          password: hashPassword,
        });

        if (!newuser) {
          return new InternalError(res);
        } else {
          return new SuccessResponse(res, {})
        }
      }
    } catch (error: any) {
      return new InternalError(res)
    }
  }


  public static async refreshTokenByToken(req: Request, res: Response) {
    try {
      let body = req.body;
      const accessToken = await generateAccessToken(body);
      const refreshToken = await generateRefreshToken(body);

      if (accessToken != null && refreshToken != null) {
        body["accessToken"] = accessToken;
        body["refreshToken"] = refreshToken;
        return new SuccessResponse(res, body);
      }
      return new InternalError(res);
    } catch (error) {
      return new InternalError(res);
    }
  }
}
