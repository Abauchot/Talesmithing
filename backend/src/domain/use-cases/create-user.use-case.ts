import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, name?: string): Promise<User> {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Créer l'utilisateur
    return await this.userRepository.create(email, name);
  }
}
