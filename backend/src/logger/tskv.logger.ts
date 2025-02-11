import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const time = new Date().toISOString();
    const messageParts = [
      `time=${time}`,
      `level=${level}`,
      `message=${message}`,
    ];

    optionalParams.forEach((param, index) => {
      messageParts.push(`param${index}=${param}`);
    });

    return messageParts.join('\t');
  }

  /**
   * Логирование на уровне log
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  /**
   * Логирование на уровне error
   */
  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }
  /**
   * Логирование на уровне warn
   */
  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  /**
   * Логирование на уровне debug
   */
  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }
  /**
   * Логирование на уровне verbose
   */
  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
}
