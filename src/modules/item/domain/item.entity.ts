import { Order } from "../../order/domain/order.entity"
import { Product } from "../../product/domain/product.entity"

export class Item {
    id: number | undefined
    product: Product
    order: Order
    discount:number
    subTotal:number
    // options: Option[]
    createdAt: string | undefined
    updatedAt: string | undefined
  
    constructor (
      id: number | undefined = undefined,
      product: Product,
      order: Order,
      discount:number,
      subTotal:number,
      //options?: Option[],
      createdAt?: string,
      updatedAt?: string) {
      this.id = id
      this.product = product
      this.order = order
      this.discount = discount
      this.subTotal = subTotal
     // this.options = options
      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }
  }
  