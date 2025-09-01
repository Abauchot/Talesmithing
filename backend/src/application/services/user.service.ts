import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../../domain/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../domain/use-cases/get-user.use-case';
import { GetAllUsersUseCase } from '../../domain/use-cases/get-all-users.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(
      createUserDto.email,
      createUserDto.name,
    );
    return this.mapToResponseDto(user);
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.getUserUseCase.execute(id);
    return user ? this.mapToResponseDto(user) : null;
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute();
    return users.map(user => this.mapToResponseDto(user));
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
