import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { RedisService } from '../redis/redis.service';
import { RequestTokenDTO } from './token.dto';
import { UserAuthModel } from '../redis/userAuth.model';
import { createHash } from 'crypto';

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService, private redisService: RedisService) {}
  async getJWT(body: RequestTokenDTO) {
    // get auth request
    const authRequest = await this.redisService.get('auth', body.code);
    const auth: UserAuthModel = JSON.parse(authRequest);
    // console.log(body);
    // console.log(auth);

    // solve code challenge
    const hash = createHash('sha256').update(body.code_verifier).digest('base64url');
    if (hash !== auth.code_challenge) {
      console.log('Error');
    }

    // load user

    const privateKey = this.configService.get('PRIVATE_KEY');

    const jwtToken = jwt.sign({ email: 'admin@probonio.de', email_verified: true, name: 'admin@probonio.de' }, privateKey, {
      algorithm: 'RS256',
      keyid: '123',
      issuer: 'http://localhost:3000',
      subject: 'CiQwOGE4Njg0Yi1kYjg4LTRiNzMtOTBhOS0zY2QxNjYxZjU0NjYSBWxvY2Fs',
      audience: ['probonio'],
      expiresIn: DateTime.now().plus({ minutes: 5 }).valueOf(),
      notBefore: DateTime.now().valueOf(),
    });
    const tokenResponse = {
      access_token: jwtToken,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
      id_token: jwtToken,
    };
    return tokenResponse;
  }
}
