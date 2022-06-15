import {
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

/**
 * this interface makes sure that you enter an object to the serialize decorator
 */
interface ClassConstructor {
  new (...args: any[]): {};
}

/**
 * Custom Decorator that do serialization
 *
 * @param dto
 * @returns
 */
export function SerializePaginated(dto: ClassConstructor) {
  return UseInterceptors(new SerializePaginatedInterceptor(dto));
}

/**
 * this interceptor is responsible for serializing sensitive data according to the given dto
 */
export class SerializePaginatedInterceptor implements NestInterceptor {
  /**@ignore */
  constructor(private dto: ClassConstructor) {}
  /**@ignore */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // return plainToInstance(this.dto, data, {
        //   excludeExtraneousValues: true,
        // });
        let result = [];
        let rawData = data['items'];
        for (let i of rawData) {
          result.push(
            plainToInstance(this.dto, i, {
              excludeExtraneousValues: true,
            }),
          );
        }
        data['items'] = result;
        return data;
      }),
    );
  }
}
