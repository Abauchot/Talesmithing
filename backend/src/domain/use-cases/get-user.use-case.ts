import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    if (id <= 0) {
      throw new Error('Invalid user ID');
    }

    return await this.userRepository.findById(id);
  }
}
