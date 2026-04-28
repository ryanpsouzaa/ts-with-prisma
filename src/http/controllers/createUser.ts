import type { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../config/logger';
import { createUserRequestSchema } from '../../validation/createUserRequest';
import { CreateUserService } from '../../services/createUserService';
import { PrismaUserRepository } from '../../repositories/PrismaUserRepository';
import { validateRequestBody } from '../../validation/validation';
import type { createUserRequest } from '../../@types/User';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  logger.info('[Start] IN - createUser');

  try {
    const body: createUserRequest = validateRequestBody(
      request.body,
      createUserRequestSchema,
    );

    logger.debug(body, 'Body');

    const userRepository = new PrismaUserRepository();
    const service = new CreateUserService(userRepository);

    const userId = await service.createUserService(body);

    logger.info('[End] OUT - createUser');
    return reply.status(201).send({ _id: userId });
  } catch (error) {
    logger.error(error);

    return reply.status(500).send(error);
  }
}
