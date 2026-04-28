import type { createUserRequest, UserModel } from '../@types/User';
import type { UserRepository } from '../repositories/UserRepository';
import { logger } from '../config/logger';
import { randomUUID } from 'node:crypto';
import { hash } from 'bcryptjs';
import { GeneralErrorResponse } from '../exceptions/GeneralErrorResponse';
import { ERRORS } from '../constants/errors';
import { statusCode } from '../constants/statusCode';

export class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUserService(body: createUserRequest) {
    logger.info('IN - createUserService');

    const result = await this.userRepository.findUniqueByEmail(body.email);

    if (result) {
      throw new GeneralErrorResponse(
        statusCode.BAD_REQUEST,
        ERRORS.ERROR_USER.EMAIL_ALREADY_EXISTS,
      );
    }

    const userData: UserModel = await buildUserData(body);

    this.userRepository.create(userData);

    logger.info('OUT - createUserService');
    return userData.id;
  }
}

async function buildUserData(body: createUserRequest) {
  const userId = randomUUID();

  const passwordHash = await hash(body.password, 6);

  return {
    id: userId,
    name: body.name,
    email: body.email,
    password_hash: passwordHash,
  };
}
