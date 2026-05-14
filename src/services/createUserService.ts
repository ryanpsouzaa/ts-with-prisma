import type { CreateUserRequest } from '../@types/User';
import type { UserRepository } from '../repositories/UserRepository';
import { logger } from '../config/logger';
import { hash } from 'bcryptjs';
import { GeneralErrorResponse } from '../exceptions/GeneralErrorResponse';
import { ERRORS } from '../constants/errors';
import { statusCode } from '../constants/statusCode';

export class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUserService(body: CreateUserRequest) {
    logger.info('IN - createUserService');

    const result = await this.userRepository.findUniqueByEmail(body.email);

    if (result) {
      throw new GeneralErrorResponse(
        statusCode.BAD_REQUEST,
        ERRORS.ERROR_USER.EMAIL_ALREADY_EXISTS,
      );
    }

    const userData = await buildUserData(body);

    const userCreatedId = this.userRepository.create(userData);

    logger.info('OUT - createUserService');
    return userCreatedId;
  }
}

async function buildUserData(body: CreateUserRequest) {
  const passwordHash = await hash(body.password, 6);

  return {
    name: body.name,
    email: body.email,
    password: passwordHash,
  };
}
