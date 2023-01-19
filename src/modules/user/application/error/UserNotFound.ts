export class UserNotFound extends Error {
  code: number;
  msg: string;

  constructor(msg: string) {
    super();
    this.name = this.constructor.name;
    this.msg = msg;
    this.code = 404;
  }
}
