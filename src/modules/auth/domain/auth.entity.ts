import { User } from '../../user/domain/user.entity';

export class Auth {
  id: number | null;
  refreshToken: string;
  user: User;

  constructor(refreshToken: string, user: User) {
    this.id = null;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
