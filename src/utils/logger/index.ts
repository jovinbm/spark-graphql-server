import pino from 'pino';

const loggerPino = pino({});

export const logger = {
  debug(message: string): undefined {
    loggerPino.debug(message);

    return undefined;
  },
  info(message: null | undefined | number | string | object): undefined {
    loggerPino.info(message);

    return undefined;
  },
  warn(message: string): undefined {
    loggerPino.warn(message);

    return undefined;
  },
  error: (error: any): undefined => {
    loggerPino.error(error);

    return undefined;
  },
};
