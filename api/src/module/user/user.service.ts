import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser() {
    const user = await this.prisma.user.create({ data: { email: 'test@test.de' } });
    return user;
  }
}
