import * as bcrypt from 'bcrypt';
export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.validateEmail(email);
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  public static async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(plainPassword, salt);
  }

  public async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }

  public updateName(newName: string): User {
    return new User(
      this.id,
      this.email,
      newName,
      this.password,
      this.createdAt,
      new Date(),
    );
  }

  public async updatePassword(newPassword: string): Promise<User> {
    const hashedPassword = await User.hashPassword(newPassword);
    return new User(
      this.id,
      this.email,
      this.name,
      hashedPassword,
      this.createdAt,
      new Date(),
    );
  }

  public isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}
