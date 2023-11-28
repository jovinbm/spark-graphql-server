import type { NextFunction, Request, Response } from 'express';
import { logger } from './utils/logger';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<{
    message: string;
    stack?: string;
  }>,
  _next: NextFunction
) => {
  logger.error(err);
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
