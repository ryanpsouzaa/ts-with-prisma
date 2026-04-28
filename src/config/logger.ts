import { pino } from 'pino';
import { env } from '../env/index';

export const logger = pino({
  level: env.NODE_ENV ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true, ignore: 'pid,hostname' },
  },
});
