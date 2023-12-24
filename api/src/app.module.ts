import { Module } from '@nestjs/common';
import { IDPConfigModule } from './module/config/config.module';
import { TokenModule } from './module/token/token.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { PrismaModule } from './module/prisma/prisma.module';
import { AuthModule } from './module/authorize/auth.module';

@Module({
  imports: [AuthModule, IDPConfigModule, TokenModule, UserModule, PrismaModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
