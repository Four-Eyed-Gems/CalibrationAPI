import { Request, Response } from 'express';
import Users from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { ErrorResponse, InternalError, SuccessResponse } from '../utils/index';
import { generateRefreshToken, generateAccessToken, validateOTP } from '../helpers/index';
import { sendMail, otpGenerator } from '../helpers/index';
import { constant } from '../constants/index';


export class AuthService {
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return new ErrorResponse(res, 404, "Credential Not Found");
      }

      const users = await Users.findOne({ email: email });
      if (!users) {
        return new ErrorResponse(res, 404, "User Not Found");
      } else {
        const passwordMatched = bcrypt.compareSync(password, users.password);
        if (!passwordMatched) {
          return new ErrorResponse(res, 401, "Unauthorized");
        } else {
          if (!users.isVerified) {
            const otp = await otpGenerator();

            //Generating ExpireTime
            const currentDate = new Date();
            const expiresIn = new Date();
            expiresIn.setMinutes(currentDate.getMinutes() + constant.OTP_EXPIRE_TIME)

            //Sending Email
            let emailSent = await sendMail(email, otp);

            if (emailSent) {
              const otpObj = { otp: otp, expiresIn: expiresIn.getTime() }
              console.log("otpObj 1-->", otpObj)
              await Users.findOneAndUpdate({ email: email }, { verification: otpObj });

              return new ErrorResponse(res, 403, 'Verify OTP with Email')
            } else {
              return new ErrorResponse(res, 500, 'Email Generation Failed')
            }
          }
          else {

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
              return new ErrorResponse(res, 403, "Token Generation Failed");
            }
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

      const users = await Users.findOne({ email: email });
      // console.log("--Register user", users)
      if (users && users.isVerified) {
        return new ErrorResponse(res, 409, 'User already exist..!')
      }
      else if (users && !users.isVerified) {
        const otp = await otpGenerator();

        //Generating ExpireTime
        const currentDate = new Date();
        const expiresIn = new Date();
        expiresIn.setMinutes(currentDate.getMinutes() + constant.OTP_EXPIRE_TIME)

        //Sending Email
        let emailSent = await sendMail(email, otp);

        if (emailSent) {
          const otpObj = { otp: otp, expiresIn: expiresIn.getTime() }
          console.log("otpObj 1-->", otpObj)
          await Users.findOneAndUpdate({ email: email }, { verification: otpObj });

          return new ErrorResponse(res, 403, 'Verify OTP with Email')
        } else {
          return new ErrorResponse(res, 500, 'Email Generation Failed')
        }
      }
      else {
        const hashPassword = await bcrypt.hashSync(password, 12);
        const newuser: any = await Users.create({
          email,
          password: hashPassword,
        });

        if (!newuser) {
          return new InternalError(res);
        } else {
          const otp = await otpGenerator();

          //Generating ExpireTime
          const currentDate = new Date();
          const expiresIn = new Date();
          expiresIn.setMinutes(currentDate.getMinutes() + constant.OTP_EXPIRE_TIME)

          //Sending Email
          let emailSent = await sendMail(email, otp);

          if (emailSent) {
            const otpObj = { otp: otp, expiresIn: expiresIn.getTime() }
            console.log("otpObj 2-->", otpObj)
            await Users.findOneAndUpdate({ email: email }, { verification: otpObj });

            return new ErrorResponse(res, 403, 'Verify OTP with Email')
          } else {
            return new ErrorResponse(res, 500, 'Email Generation Failed')
          }
        }
      }
    } catch (error: any) {
      return new InternalError(res)
    }
  }

  public static async verifyOTP(req: Request, res: Response) {
    try {
      const { otp } = req.body;
      const user = await Users.findOne({ "verification.otp": otp })

      if (user && user?.verification) {
        const otpValid = await validateOTP(user?.verification?.expiresIn as any)
        if (!otpValid) {
          user.verification = undefined;
          user?.save();
          return new ErrorResponse(res, 401, "OTP Expired")
        }
        else {
          user.isVerified = true;
          user.verification = undefined;
          user?.save();
          return new SuccessResponse(res, {})
        }
      }
      else {
        return new ErrorResponse(res, 404, "OTP Not Found")
      }
    } catch (error) {
      return new InternalError(res)
    }
  }

  public static async forgotPassword(req: Request, res: Response) {
    try {
      const { email, method } = req.body;
      if (!email) return new ErrorResponse(res, 404, "email not found");
      if (!method) return new ErrorResponse(res, 404, "method not found");
      if (method == 1) {

      }

      if (method == 2) {

      }
    } catch (error) {
      console.log("Error forgotpassword ->", error)
      return new InternalError(res);
    }
  }

  public static async checkUserInDB(req: Request, res: Response) {
    try {

    } catch (error) {
      console.log("Error checkUserInDB ->", error)
      return new InternalError(res);
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
