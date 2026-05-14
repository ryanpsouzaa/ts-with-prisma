import type { FastifyInstance } from 'fastify';
import { createUser } from '../controllers/createUser';
import { authenticateUser } from '../controllers/authenticateUser';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
  app.post('/login', authenticateUser);
}
