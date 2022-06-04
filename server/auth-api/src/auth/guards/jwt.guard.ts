import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * This Guard is responsible for check if the request contains a valid jwt or not
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
