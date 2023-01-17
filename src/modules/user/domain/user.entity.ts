export class User {
  id: number | undefined
  email: string
  verified: boolean
  createdAt: string | undefined
  updatedAt: string | undefined
  constructor (id: number, email: string, verified: boolean, createdAt: string, updatedAt: string) {
    this.id = id
    this.email = email
    this.verified = verified
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
