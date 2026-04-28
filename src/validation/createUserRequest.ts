import { z } from 'zod';

export const createUserRequestSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});
