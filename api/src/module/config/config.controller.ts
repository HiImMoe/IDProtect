import { Controller, Get } from '@nestjs/common';
import { IDPConfigService } from './config.service';

@Controller('/.well-known')
export class IDPConfigController {
  constructor(private readonly idpConfigService: IDPConfigService) {}

  @Get('/openid-configuration')
  getOpenIdConfiguration() {
    const url = 'http://localhost:3000';
    const config = {
      issuer: url,
      authorization_endpoint: `http://localhost:3001/authorize`,
      token_endpoint: `${url}/token`,
      userinfo_endpoint: `${url}/userinfo`,
      jwks_uri: `${url}/.well-kown/jwks`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      response_types_supported: ['code', 'id_token', 'token'],
      scopes_supported: ['openid', 'email', 'profile'],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_token_signing_alg_values_supported: ['RS256'],
    };

    return config;
  }

  @Get('/jwks')
  getJwks() {
    const jwks = this.idpConfigService.getJWKs();
    return jwks;
  }
}
