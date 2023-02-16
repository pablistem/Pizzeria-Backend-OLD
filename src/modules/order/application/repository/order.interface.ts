import { Order } from "../../domain/order.entity";

export interface IOrderRepository {
    getOrderById(order:number):Promise<Order>
}