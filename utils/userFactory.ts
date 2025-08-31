// factories/UserFactory.ts
export interface UserData {
  name: string;
  email: string;
  password: string;
}

export class UserFactory {
  static createRandomUser(): UserData {
    const timestamp = Date.now();
    return {
      name: `TestUser${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'password123',
    };
  }
}
