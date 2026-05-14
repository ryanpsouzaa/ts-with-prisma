import type { User } from '@prisma/client';
import type { CreateUserRequest } from '../@types/User';

export interface UserRepository {
  create(data: CreateUserRequest): Promise<string>;
  findUniqueByEmail(email: string): Promise<User | null>;
}
