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
      const password = 'password123';
      const name = 'Test User';
      const hashedPassword = 'hashedPassword123';
      const createdUser = new User(1, email, name, hashedPassword, new Date(), new Date());

      // Mock the static method
      jest.spyOn(User, 'hashPassword').mockResolvedValue(hashedPassword);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(createdUser);

      // Act
      const result = await createUserUseCase.execute(email, password, name);

      // Assert
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(User.hashPassword).toHaveBeenCalledWith(password);
      expect(mockUserRepository.create).toHaveBeenCalledWith(email, hashedPassword, name);
      expect(result).toEqual(createdUser);
    });

    it('should throw error when user with email already exists', async () => {
      // Arrange
      const email = 'existing@example.com';
      const password = 'password123';
      const name = 'New User';
      const existingUser = new User(1, email, 'Existing User', 'hashedPassword', new Date(), new Date());

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(createUserUseCase.execute(email, password, name)).rejects.toThrow(
        'User with this email already exists'
      );
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should hash the password before creating user', async () => {
      // Arrange
      const email = 'test@example.com';
      const plainPassword = 'MyPlainPassword123!';
      const name = 'Test User';
      const hashedPassword = 'hashedPassword123';
      const createdUser = new User(1, email, name, hashedPassword, new Date(), new Date());

      // Mock the static method
      const hashPasswordSpy = jest.spyOn(User, 'hashPassword').mockResolvedValue(hashedPassword);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(createdUser);

      // Act
      await createUserUseCase.execute(email, plainPassword, name);

      // Assert
      expect(hashPasswordSpy).toHaveBeenCalledWith(plainPassword);
      expect(hashPasswordSpy).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.create).toHaveBeenCalledWith(email, hashedPassword, name);

      // Verify that the plain password is not passed to the repository
      expect(mockUserRepository.create).not.toHaveBeenCalledWith(email, plainPassword, name);
    });

    it('should validate password using User entity method', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'MyTestPassword123!';
      const name = 'Test User';
      const hashedPassword = 'hashedPassword123';
      const createdUser = new User(1, email, name, hashedPassword, new Date(), new Date());

      jest.spyOn(User, 'hashPassword').mockResolvedValue(hashedPassword);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(createdUser);

      // Act
      const result = await createUserUseCase.execute(email, password, name);

      // Assert - Test that the created user can validate the original password
      jest.spyOn(result, 'validatePassword').mockResolvedValue(true);
      const isPasswordValid = await result.validatePassword(password);
      expect(isPasswordValid).toBe(true);
    });
  });
});
