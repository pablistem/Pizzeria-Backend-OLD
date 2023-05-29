import { Auth } from "../../auth/domain/auth.entity";
import { Base } from "../../common/domain/base.entity";

export enum RoleEnum {
  admin = 'admin',
  user = 'user',
} 


export class User extends Base {
  
  email: string;
  name: string;
  lastName:string;
  hash: string | undefined;
  verified: boolean | undefined;
  role:string | undefined
  sessions: Auth[] | undefined

  constructor(
    email: string,
    name: string,
    lastName:string,
    id?: number | undefined,
    hash?: string | undefined,
    verified?: boolean | undefined,
    role?: string | undefined,
    sessions?: Auth[] | undefined,
    createdAt?: string | undefined,
    updatedAt?: string | undefined,
  ) {
   super(id,createdAt,updatedAt)
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.hash = hash;
    this.verified = verified;
    this.role = role;
    this.sessions = sessions;
  
  }
}
