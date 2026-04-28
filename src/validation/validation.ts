import { z, type ZodObject } from 'zod';
import { GeneralErrorResponse } from '../exceptions/GeneralErrorResponse';
import { statusCode } from '../constants/statusCode';
import { ERRORS } from '../constants/errors';

export function validateRequestBody(data: any, schema: ZodObject): any {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationDetails = error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      throw new GeneralErrorResponse(
        statusCode.BAD_REQUEST,
        ERRORS.ERROR_GENERAL.VALIDATION_ERROR,
        validationDetails,
      );
    }

    throw error;
  }
}
