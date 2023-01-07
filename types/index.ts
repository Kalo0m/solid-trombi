import type { NextApiRequest } from 'next';
import type { Session } from 'next-auth';

export interface AppNextApiRequest extends NextApiRequest {
  session?: Session & {
    userId?: string;
  };
}