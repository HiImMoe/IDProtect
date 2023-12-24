import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO } from './auth.dto';
import { RedisService } from '../redis/redis.service';
import { randomBytes } from 'crypto';
import { DateTime } from 'luxon';
import { UserAuthModel } from '../redis/userAuth.model';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private redis: RedisService) {}
  async login(loginDTO: LoginDTO) {
    // get user with email pw and client id

    const code = randomBytes(64).toString('hex');
    const userAuth: UserAuthModel = {
      userId: '',
      code_challenge: loginDTO.code_challenge,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      code_challenge_method: loginDTO.code_challenge_method,
    };

    await this.redis.setWithExpiry('auth', code, JSON.stringify(userAuth), DateTime.now().plus({ minutes: 5 }).valueOf());
    return code;
  }
}
