const ERROR_USER = {
  EMAIL_ALREADY_EXISTS: {
    apiCode: 'api-201',
    message: 'The provided email address is already registered.',
  },
};

const ERROR_GENERAL = {
  VALIDATION_ERROR: {
    apiCode: 'api-101',
    message: 'One or more fields are invalid. Please check your input.',
  },
  INTERNAL_SERVER_ERROR: {
    apiCode: 'api-102',
    message: 'An unexpected error occurred.',
  },
};

export const ERRORS = {
  ERROR_GENERAL,
  ERROR_USER,
};
