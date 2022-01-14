export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}
