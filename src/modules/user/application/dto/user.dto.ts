export class UserDto {
  id: number;
  email: string;
  name: string;
  verified: boolean | undefined;

  constructor({
    id,
    email,
    name,
    verified,
  }: {
    id: number;
    email: string;
    name: string;
    verified?: boolean | undefined;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.verified = verified;
  }

  validate(): void {
    if (this.id === undefined) {
      throw new Error("Validation error");
    }
    if (this.email === undefined) {
      throw new Error("Validation error");
    }
    if (this.name === undefined) {
      throw new Error("Validation error");
    }
    if (this.verified === undefined) {
      throw new Error("Validation error");
    }
  }
}
