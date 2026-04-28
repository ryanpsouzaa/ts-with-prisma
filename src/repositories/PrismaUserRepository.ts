import { prisma } from '../database/prismaConnection';
import type { UserModel } from '../@types/User';
import type { UserRepository } from './UserRepository';

export class PrismaUserRepository implements UserRepository {
  async create(userData: UserModel) {
    await prisma.user.create({
      data: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password_hash: userData.password_hash,
      },
    });

    return userData.id;
  }

  async findUniqueByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
