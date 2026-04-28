import type { User } from '@prisma/client';

export interface UserRepository {
  create(data: User): Promise<string>;
  findUniqueByEmail(email: string): Promise<User | null>;
}
