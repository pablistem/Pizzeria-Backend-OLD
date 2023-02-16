export class Order {
  id: number | undefined
  status: string
  total: number
  // itemList: Item[]
  // coupons: Coupon[]
  createdAt: string | undefined
  updatedAt: string | undefined

  constructor (
    id: number | undefined = undefined,
    status: string,
    total: number,
    //itemList?: Item[],
    //coupons?: Coupon[],
    createdAt?: string,
    updatedAt?: string) {
    this.id = id
    this.status = status
    this.total = total
   // this.itemList = itemList
   // this.coupons = coupons
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
