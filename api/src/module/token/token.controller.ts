import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { RequestTokenDTO } from './token.dto';

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/token')
  getToken(@Body() body: RequestTokenDTO) {
    const token = this.tokenService.getJWT(body);
    return token;
  }
}
