import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPublicKey } from 'crypto';

@Injectable()
export class IDPConfigService {
  constructor(private configService: ConfigService) {}
  getJWKs() {
    const pemPublicKey = this.configService.get('PUBLIC_KEY');
    const publicKey = createPublicKey(pemPublicKey);
    const jwkKey = publicKey.export({ format: 'jwk' });
    const jwks = {
      keys: [
        {
          ...jwkKey,
          kid: '123',
        },
      ],
    };
    return jwks;
  }
}
