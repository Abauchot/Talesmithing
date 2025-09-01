import { Module } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class RepositoryModule {}
