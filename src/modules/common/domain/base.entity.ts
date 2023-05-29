export class Base {
    id?: number
    createdAt?: string 
    updatedAt?: string 
    constructor(id: number | undefined,createdAt: string | undefined,updatedAt: string | undefined){
        this.id = id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}