
import {Unauthorized} from "../error"
import jwt from 'jsonwebtoken'



export function Authenticate(){


return function   ( target:Object, propertyKey:string, descriptor:PropertyDescriptor){

  

      const originalMethod = descriptor.value
        descriptor.value = function (...args:any[]) {

          const authHeader: string | undefined = args[0].headers.authorization
            if (authHeader === undefined) { 
              throw new Unauthorized() 
            }

          const token: string = authHeader?.split(' ')[1]
          console.log(token)
            

          jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
            console.log(err)
            if (err != null) {
              throw new Unauthorized()
            }
           
            args[0] .user = user  
                      
          })
             
            return originalMethod.apply(this,args)
    }
  }
  }



