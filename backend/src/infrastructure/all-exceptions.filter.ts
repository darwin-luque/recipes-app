import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(public readonly httpAdapterHost: HttpAdapterHost) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof QueryFailedError) {
      const { httpAdapter } = this.httpAdapterHost;

      const ctx = host.switchToHttp();

      const response = ctx.getResponse() as Response;
      const request = ctx.getRequest() as Request;

      const error = new BadRequestException(
        'Instance with some given parameters already exists',
      );

      const responseBody = {
        statusCode: error.getStatus(),
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: error.stack,
        name: error.name,
        path: httpAdapter.getRequestUrl(request),
      };

      return httpAdapter.reply(response, responseBody, responseBody.statusCode);
    }
    super.catch(exception, host);
  }
}
