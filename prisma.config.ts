import { defineConfig } from '@prisma/config';
import { env } from './src/env'; // Ajuste o caminho conforme sua pasta

export default defineConfig({
  datasource: {
    url: env.DATABASE_URL,
  },
});
