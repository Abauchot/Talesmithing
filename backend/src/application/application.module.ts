import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UseCaseModule } from '../domain/use-case.module';

@Module({
  imports: [UseCaseModule],
  providers: [UserService],
  exports: [UserService],
})
export class ApplicationModule {}
