import { AttributeBase } from './base.model';

export interface User extends AttributeBase {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthRequest {
  identifier: string;
  password: string;
}

// export type Request = Pick<User, 'username' | 'email'> & { password: string };
