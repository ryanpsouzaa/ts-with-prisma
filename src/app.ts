import fastify from 'fastify';

import { appRoutes } from './http/routes/routes';
import { GeneralErrorResponse } from './exceptions/GeneralErrorResponse';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof GeneralErrorResponse) {
    return {
      statusCode: error.statusCode,
      code: error.apiCode,
      message: error.message,
      errors: error.errors,
    };
  }
});
