import { User, UserRole } from './user.entity';

export const users: User[] = [
  {
    id: 1,
    name: 'Abiral Sthapit',
    email: 'abiral@gmail.com',
    password: 'Test@123',
    phone_number: '+9779843671243',
    role: UserRole.ADMIN,
    created_at: new Date('2022-01-13T18:05:37.235Z'),
    updated_at: null,
  },
  {
    id: 2,
    name: 'Abiral2 Sthapit',
    email: 'abiral2@gmail.com',
    password: 'Test@123',
    phone_number: '+9779843671243',
    role: UserRole.USER,
    created_at: new Date('2022-01-13T18:05:59.864Z'),
    updated_at: null,
  },
  {
    id: 3,
    name: 'Abiral3 Sthapit',
    email: 'abiral3@gmail.com',
    password: 'Test@123',
    phone_number: '+9779843671243',
    role: UserRole.USER,
    created_at: new Date('2022-01-13T18:06:19.545Z'),
    updated_at: null,
  },
];
