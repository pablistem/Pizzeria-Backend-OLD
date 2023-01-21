export class User {
  email: string;
  name: string ;
  id: number | undefined;
  hash: string | undefined;
  verified: boolean | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;

  constructor(
    email: string,
    name: string,
    id?: number | undefined,
    hash?: string | undefined,
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
