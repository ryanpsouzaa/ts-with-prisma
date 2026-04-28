import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';
import pg from 'pg';
import { env } from '../env';

// Criamos o Pool passando as propriedades separadas.
// Isso evita que o driver 'pg' falhe ao tentar dar parse na string de conexão.
const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  user: 'docker',
  password: 'docker', // Como você disse que é padrão, passamos direto ou via env
  database: 'databasepg',
  // Se quiser usar a string do env:
  // connectionString: env.DATABASE_URL
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'DEV' ? ['query'] : [],
});
