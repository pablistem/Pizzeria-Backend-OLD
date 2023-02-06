export class ProductNotFound extends Error {
  code: number;

  constructor(id?: number) {
    super();
    this.name = this.constructor.name;
    this.message = id ? `Product ${id} not found` : "Product not found";
    this.code = 400;
  }
}
