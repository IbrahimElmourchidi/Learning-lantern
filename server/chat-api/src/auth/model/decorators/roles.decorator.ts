import { SetMetadata } from '@nestjs/common';

/**
 * This decorator add alist of allowed roles to the metadata of the request
 * @param roles
 * @returns
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
