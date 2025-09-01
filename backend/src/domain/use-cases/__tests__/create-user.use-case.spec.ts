import { CreateUserUseCase } from '../create-user.use-case';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  describe('execute', () => {
    it('should create a user successfully when email does not exist', async () => {
      // Arrange
      const email = 'test@example.com';
      const name = 'Test User';
      const createdUser = new User(1, email, name, new Date(), new Date());

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(createdUser);

      // Act
      const result = await createUserUseCase.execute(email, name);

      // Assert
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(mockUserRepository.create).toHaveBeenCalledWith(email, name);
      expect(result).toEqual(createdUser);
    });

    it('should throw error when user with email already exists', async () => {
      // Arrange
      const email = 'existing@example.com';
      const existingUser = new User(1, email, 'Existing User', new Date(), new Date());

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(createUserUseCase.execute(email, 'New User')).rejects.toThrow(
        'User with this email already exists'
      );
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should create user without name when name is not provided', async () => {
      // Arrange
      const email = 'test@example.com';
      const createdUser = new User(1, email, null, new Date(), new Date());

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(createdUser);

      // Act
      const result = await createUserUseCase.execute(email);

      // Assert
      expect(mockUserRepository.create).toHaveBeenCalledWith(email, undefined);
      expect(result).toEqual(createdUser);
    });
  });
});
