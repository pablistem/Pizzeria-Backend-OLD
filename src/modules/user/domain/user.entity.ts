export class User {
  id: number | undefined;
  email: string;
  name: string;
  hash: string;
  verified: boolean | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;

  constructor(
    id: number | undefined,
    email: string,
    name: string,
    hash: string,
    verified?: boolean | undefined,
    createdAt?: string | undefined,
    updatedAt?: string | undefined
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.hash = hash;
    this.verified = verified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
