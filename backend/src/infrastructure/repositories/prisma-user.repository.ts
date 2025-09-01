import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findById(id: number): Promise<User | null> {
    const userData = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!userData) {
      return null;
    }

    return new User(
      userData.id,
      userData.email,
      userData.name,
      userData.password,
      userData.createdAt,
      userData.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!userData) {
      return null;
    }

    return new User(
      userData.id,
      userData.email,
      userData.name,
      userData.password,
      userData.createdAt,
      userData.updatedAt,
    );
  }

  async create(email: string, password: string, name: string): Promise<User> {
    const userData = await this.databaseService.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return new User(
      userData.id,
      userData.email,
      userData.name,
      userData.password,
      userData.createdAt,
      userData.updatedAt,
    );
  }

  async update(user: User): Promise<User> {
    const userData = await this.databaseService.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        updatedAt: new Date(),
      },
    });

    return new User(
      userData.id,
      userData.email,
      userData.name,
      userData.password,
      userData.createdAt,
      userData.updatedAt,
    );
  }

  async delete(id: number): Promise<void> {
    await this.databaseService.user.delete({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    const usersData = await this.databaseService.user.findMany();

    return usersData.map(
      userData =>
        new User(
          userData.id,
          userData.email,
          userData.name,
          userData.password,
          userData.createdAt,
          userData.updatedAt,
        ),
    );
  }
}
