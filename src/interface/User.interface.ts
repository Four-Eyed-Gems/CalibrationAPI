export interface UserCreationAttributes {
  email: string;
  password: string;
  refreshToken: string;
  isVerified: boolean;
  verification?: {
    otp: number,
    expiresIn: number
  }
}