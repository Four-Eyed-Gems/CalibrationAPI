import jwt from 'jsonwebtoken';
import environmentConfig from '../constants/environment.constant';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, InternalError } from '../utils/index';


export const generateAccessToken = (body: any) => {
    try {
        const token = jwt.sign(body, environmentConfig.JWT_SECRET, { expiresIn: 60 })
        return token
    } catch (error) {
        return null;
    }
}

export const generateRefreshToken = (body: any) => {
    try {
        const refreshToken = jwt.sign(body, environmentConfig.JWT_SECRET, { expiresIn: "10m" })
        return refreshToken
    } catch (error) {
        return null;
    }
}
