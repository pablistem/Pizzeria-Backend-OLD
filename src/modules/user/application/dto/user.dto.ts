export class UserDto {
  id: number
  email: string
  verified: boolean

  constructor ({ id, email, verified }: { id: number, email: string, verified: boolean }) {
    this.id = id
    this.email = email
    this.verified = verified
  }

  validate (): void {
    if (this.id === undefined) {
      throw new Error('Validation error')
    }
  }
}
