import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController],
})
export class PresentationModule {}
