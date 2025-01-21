import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret:
    process.env.JWT_SECRET ||
    'a4f129ecc51a034f1f2be7cce7d1fa2180330a9916b57b11e6cfece913d64297',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
