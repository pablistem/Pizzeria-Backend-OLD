import { Application, Request, Response, NextFunction } from "express";
import { OrderService } from "../application/service/order.service";



export class OrderController {
  baseRoute = "/order";

  constructor(
    private readonly orderService: OrderService
  ) {}

  configureRoutes(app: Application): void {
   
  }

 
}
