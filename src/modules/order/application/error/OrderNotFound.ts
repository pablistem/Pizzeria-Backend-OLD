export class OrderNotFound extends Error {
  code: number;

  constructor(id?: number) {
    super();
    this.name = this.constructor.name;
    this.message = id ? `Order ${id} not found` : "Order not found";
    this.code = 400;
  }
}
