export class newUserDto {
  email: string;
  name: string;
  hash: string;

  constructor({
    email,
    name,
    hash,
  }: {
    email: string;
    name: string;
    hash: string;
  }) {
    this.email = email;
    this.name = name;
    this.hash = hash;
  }

  validate(): void {
    if (this.email === undefined) {
      throw new Error("Validation error");
    }
    if (this.name === undefined) {
      throw new Error("Validation error");
    }
    if (this.hash === undefined) {
      throw new Error("Validation error");
    }
  }
}
