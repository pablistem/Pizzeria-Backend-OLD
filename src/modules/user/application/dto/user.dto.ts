export class UserDto {
  id: number;
  email: string;
  name: string;
  lastName:string;
  verified: boolean | undefined;

  constructor({
    id,
    email,
    name,
    lastName,
    verified,
  }: {
    id: number;
    email: string;
    name: string;
    lastName:string;
    verified?: boolean | undefined;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
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
    if (this.lastName === undefined) {
      throw new Error("Validation error");
    }
    if (this.verified === undefined) {
      throw new Error("Validation error");
    }
  }
}
