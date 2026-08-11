import { isString } from 'lodash';
import process from 'process';

const SEVERITY = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  CRITICAL: 'critical'
} as const;

type LogSeverity = (typeof SEVERITY)[keyof typeof SEVERITY];

type LogError = {
  message: string;
  stacktrace?: string;
  code?: string | number;
};

type LogData = Record<
  string,
  string | number | string[] | number[] | (string | number)[]
>;

type Log = {
  userId?: string;
  timestamp: number;
  severity: LogSeverity;
  env: string;
  url: string;
  screen: string;
  viewport: string;
  error?: LogError;
  data?: LogData;
};

class Logging {
  userId?: string;
  constructor() {}

  private sanitizeObject<T extends LogError | LogData>(obj: T): T {
    const output = {} as T;
    for (const _key of Object.keys(obj)) {
      const key = _key as keyof T;
      if (isString(obj[key] && /user|pass/g.test(key as string))) {
        output[key] = 'REDACTED' as unknown as T[keyof T];
      }
      output[key] = obj[key];
    }

    return output;
  }

  private buildLog(
    severity: LogSeverity,
    error?: LogError,
    data?: LogData
  ): Log {
    const sanitizedError = error && this.sanitizeObject(error);
    const sanitizedData = data && this.sanitizeObject(data);

    const log: Log = {
      severity,
      userId: this.userId,
      timestamp: Date.now(),
      env: process.env.NODE_ENV ?? 'unknown',
      url: window.location.href,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    };

    if (sanitizedError) log.error = sanitizedError;
    if (sanitizedData) log.data = sanitizedData;

    return log;
  }

  info(data?: LogData) {
    const log = this.buildLog(SEVERITY.INFO, undefined, data);
    console.log(
      process.env.NODE_ENV === 'development' ? log.data?.message : log
    );
  }

  warn(data?: LogData) {
    const log = this.buildLog(SEVERITY.INFO, undefined, data);
    console.warn(log);
  }

  error(error: LogError, data?: LogData) {
    const log = this.buildLog(SEVERITY.INFO, error, data);
    console.error(log);
  }

  critical(error: LogError, data: LogData) {
    const log = this.buildLog(SEVERITY.INFO, error, data);
    console.error(log);
  }
}

export const logging = new Logging();
