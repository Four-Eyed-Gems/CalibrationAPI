import jwt from 'jsonwebtoken';
import { environmentConfig, constant } from '../constants/index';

export const generateAccessToken = (body: any) => {
    try {
        const token = jwt.sign(body, environmentConfig.JWT_SECRET, { expiresIn: constant.ACCESS_TOKEN_EXPIRE })
        return token
    } catch (error) {
        return null;
    }
}

export const generateRefreshToken = (body: any) => {
    try {
        const refreshToken = jwt.sign(body, environmentConfig.JWT_SECRET, { expiresIn: constant.REFRESH_TOKEN_EXPIRE })
        return refreshToken
    } catch (error) {
        return null;
    }
}
