import type { AuthenticateUserRequest } from '../@types/User';
import type { UserRepository } from '../repositories/UserRepository';
import { logger } from '../config/logger';
import { GeneralErrorResponse } from '../exceptions/GeneralErrorResponse';
import { statusCode } from '../constants/statusCode';
import { ERRORS } from '../constants/errors';
import { compare } from 'bcryptjs';

export class AuthenticateUserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  async execute({ email, password }: AuthenticateUserRequest) {
    logger.info('IN - AuthenticateUser - execute');

    const user = await this.userRepository.findUniqueByEmail(email);

    const doesPasswordMatches = user
      ? compare(password, user.passwordHash)
      : false;

    if (!doesPasswordMatches) {
      throw new GeneralErrorResponse(
        statusCode.UNAUTHORIZED,
        ERRORS.ERROR_GENERAL.INVALID_CREDENTIALS,
      );
    }

    logger.info('OUT - AuthenticateUser - execute');
    return user;
  }
}
