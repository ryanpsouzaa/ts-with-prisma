import type { CreateUserRequest } from '../@types/User';
import { prisma } from '../database/prismaConnection';
import type { UserRepository } from './UserRepository';

export class PrismaUserRepository implements UserRepository {
  async create(userData: CreateUserRequest) {
    const userCreated = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        passwordHash: userData.password,
      },
    });

    return userCreated.id;
  }

  async findUniqueByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
