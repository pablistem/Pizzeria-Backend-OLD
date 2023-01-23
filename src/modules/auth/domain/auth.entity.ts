

export class Auth {
  id: number | undefined;
  refreshToken: string;
 

  constructor( refreshToken: string, id?:number,  ) {
    this.id = id;
    this.refreshToken = refreshToken;
  }
}
