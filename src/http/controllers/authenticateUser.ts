import type { FastifyReply, FastifyRequest } from 'fastify';
import { logger } from '../../config/logger';
import { validateRequestBody } from '../../validation/validation';
import { authenticateUserRequestSchema } from '../../validation/schemas/authenticateUserRequest';
import { PrismaUserRepository } from '../../repositories/PrismaUserRepository';
import { AuthenticateUserService } from '../../services/authenticateUserService';

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  logger.info('[Start] IN - authenticateUser');

  const body = validateRequestBody(request.body, authenticateUserRequestSchema);

  logger.debug(body, 'Body');

  const userRepository = new PrismaUserRepository();
  const service = new AuthenticateUserService(userRepository);

  const user = await service.execute(body);

  logger.info('[End] OUT - authenticateUser');
  return reply.status(200).send({ user });
}
