export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly name: string | null,
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

  public updateName(newName: string): User {
    return new User(
      this.id,
      this.email,
      newName,
      this.createdAt,
      new Date(),
    );
  }

  public isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}
