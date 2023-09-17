export interface UserInstance {
  email: string;
  password: string;
  refreshToken: string;
}

export type UserCreationAttributes = UserInstance