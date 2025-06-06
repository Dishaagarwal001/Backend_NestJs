import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const customMessage =
      this.reflector.get<string>('message', context.getHandler()) || 'success';

    const statusCode = context.switchToHttp().getResponse().statusCode || 200;

    return next.handle().pipe(
      map((data) => ({
        isSuccess: true,
        statusCode,
        message: customMessage,
        data,
        errorCode: null,
        errors: [],
      })),
    );
  }
}
