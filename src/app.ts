import fastify from 'fastify';

import { appRoutes } from './http/routes/routes';
import { GeneralErrorResponse } from './exceptions/GeneralErrorResponse';
import { statusCode } from './constants/statusCode';
import { ERRORS } from './constants/errors';

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
  } else {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      message: ERRORS.ERROR_GENERAL.INTERNAL_SERVER_ERROR,
    };
  }
});
