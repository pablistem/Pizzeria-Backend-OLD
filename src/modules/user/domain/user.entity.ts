import { Auth } from "../../auth/domain/auth.entity";

export enum RoleEnum {
  admin = 'admin',
  user = 'user',
} 


export class User {
  email: string;
  name: string ;
  id: number | undefined;
  hash: string | undefined;
  verified: boolean | undefined;
  role:string | undefined
  sessions: Auth[] | undefined
  createdAt: string | undefined;
  updatedAt: string | undefined;

  constructor(
    email: string,
    name: string,
    id?: number | undefined,
    hash?: string | undefined,
    verified?: boolean | undefined,
    role?: string | undefined,
    sessions?: Auth[] | undefined,
    createdAt?: string | undefined,
    updatedAt?: string | undefined,
    
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.hash = hash;
    this.verified = verified;
    this.role = role;
    this.sessions = sessions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
