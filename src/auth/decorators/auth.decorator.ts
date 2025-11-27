import { SetMetadata } from '@nestjs/common';

export const Auth = (...args: string[]) => {
  console.log(args);
  return SetMetadata('auth', args);
};
