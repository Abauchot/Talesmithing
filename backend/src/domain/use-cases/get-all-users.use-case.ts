import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
