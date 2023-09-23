export interface UserCreationAttributes {
  email: string;
  password: string;
  refreshToken: string;
  isVerified: boolean;
  verification?: {
    verificationCode: number,
    expiresIn: number
  }
}