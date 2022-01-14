import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

export const JWTGuard = () =>
  applyDecorators(
    ApiBearerAuth('access-token'),
    // SetMetadata('roles', ['ADMIN']),
    UseGuards(AuthGuard('jwt')),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
  );
