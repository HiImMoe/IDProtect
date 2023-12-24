import { Global, INestApplication, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({ providers: [PrismaService], exports: [PrismaService] })
@Global()
export class PrismaModule {
  /**
   * see https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
   */
  static init(app: INestApplication) {
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);
  }
}
