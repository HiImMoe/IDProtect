import { Module } from '@nestjs/common';
import { IDPConfigController } from './config.controller';
import { IDPConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [IDPConfigController],
  providers: [IDPConfigService],
})
export class IDPConfigModule {}
