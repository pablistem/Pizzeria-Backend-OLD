
import { IOrderRepository } from "../repository/order.interface";

export class OrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}


}
