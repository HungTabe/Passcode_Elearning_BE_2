import { env } from '@/config/env'

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: unknown
  error?: Error
}

class Logger {
  private log(level: LogLevel, message: string, data?: unknown, error?: Error) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      error,
    }

    if (env.NODE_ENV === 'development') {
      console.log(JSON.stringify(entry, null, 2))
    } else {
      // In production, you might want to send logs to a service like CloudWatch, LogRocket, etc.
      console.log(`[${level.toUpperCase()}] ${message}`, data || '', error || '')
    }
  }

  error(message: string, error?: Error, data?: unknown) {
    this.log(LogLevel.ERROR, message, data, error)
  }

  warn(message: string, data?: unknown) {
    this.log(LogLevel.WARN, message, data)
  }

  info(message: string, data?: unknown) {
    this.log(LogLevel.INFO, message, data)
  }

  debug(message: string, data?: unknown) {
    if (env.NODE_ENV === 'development') {
      this.log(LogLevel.DEBUG, message, data)
    }
  }
}

export const logger = new Logger()
