import {
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function SerializePaginated(dto: ClassConstructor) {
  return UseInterceptors(new SerializePaginatedInterceptor(dto));
}

export class SerializePaginatedInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // return plainToInstance(this.dto, data, {
        //   excludeExtraneousValues: true,
        // });
        let result = [];
        let rawData = data['items'];
        for (let i of rawData)
          result.push(
            plainToInstance(this.dto, i, {
              excludeExtraneousValues: true,
            }),
          );
        data['items'] = result;
        return data;
      }),
    );
  }
}
