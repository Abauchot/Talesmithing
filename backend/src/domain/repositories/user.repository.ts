import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(email: string, password: string, name: string): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract delete(id: number): Promise<void>;
  abstract findAll(): Promise<User[]>;
}
