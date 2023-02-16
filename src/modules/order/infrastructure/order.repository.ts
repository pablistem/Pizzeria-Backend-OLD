import { IOrderRepository } from "../application/repository/order.interface";
import { Order } from "../domain/order.entity";
import { OrderModel } from "./order.model";


export class OrderRepository implements IOrderRepository {
  private readonly orderModel: typeof OrderModel;
  constructor(orderModel: OrderModel) {
    this.orderModel = OrderModel as any;
  }
 async getOrderById(order: number): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  
}
