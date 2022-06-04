import {
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

/** makes sure you enter object as argument to the interceptor */
interface ClassConstructor {
  new (...args: any[]): {};
}

/** custom decorator to use the interceptor */
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * serialize user sensitive data
 */
export class SerializeInterceptor implements NestInterceptor {
  /**@ignore */
  constructor(private dto: ClassConstructor) {}
  /**@ignore */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
