import { User } from '../../user/domain/user.entity';

export class Auth {
  id: number | undefined;
  refreshToken: string;
  user: User | undefined;

  constructor( refreshToken: string, id?:number, user?: User ) {
    this.id = id;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
