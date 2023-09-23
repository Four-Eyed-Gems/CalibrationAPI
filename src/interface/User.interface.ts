export interface UserCreationAttributes {
  email: string;
  password: string;
  refreshToken: string;
  isVerified: boolean;
  verification?: {
    verificationCode: any,
    expiresIn: number
  }
}