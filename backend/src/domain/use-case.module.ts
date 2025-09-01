import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '../domain/use-cases/create-user.use-case';
import { GetUserUseCase } from '../domain/use-cases/get-user.use-case';
import { GetAllUsersUseCase } from '../domain/use-cases/get-all-users.use-case';
import { UserRepository } from '../domain/repositories/user.repository';
import { RepositoryModule } from '../infrastructure/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepository) => 
        new CreateUserUseCase(userRepository),
      inject: [UserRepository],
    },
    {
      provide: GetUserUseCase,
      useFactory: (userRepository: UserRepository) => 
        new GetUserUseCase(userRepository),
      inject: [UserRepository],
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: (userRepository: UserRepository) => 
        new GetAllUsersUseCase(userRepository),
      inject: [UserRepository],
    },
  ],
  exports: [CreateUserUseCase, GetUserUseCase, GetAllUsersUseCase],
})
export class UseCaseModule {}
