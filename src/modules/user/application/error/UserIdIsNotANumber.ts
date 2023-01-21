export class UserIdIsNotANumber extends Error {
  code: number;

  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "The provided ID is not a number";
    this.code = 400;
  }
}
