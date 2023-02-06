import { Request } from "express";



declare namespace Express {
    export interface Request {
        user: {role:string , id:number, email:string}
    }
 }

