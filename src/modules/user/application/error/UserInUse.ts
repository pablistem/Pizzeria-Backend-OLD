export class UserInUse extends Error {
  code: number;
  msg: string;

  constructor(msg: string) {
    super();
    this.name = this.constructor.name;
    this.msg = msg;
    this.code = 402;
  }
}
