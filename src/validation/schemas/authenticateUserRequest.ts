import { z } from 'zod';

export const authenticateUserRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});
