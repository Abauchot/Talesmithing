import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string, name: string): Promise<User> {

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await User.hashPassword(password);
    
    return await this.userRepository.create(email, hashedPassword, name);
  }
}