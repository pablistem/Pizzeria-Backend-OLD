import { User } from '../../domain/user.entity'

export const fromModelToEntity = ({ id, email, verified, createdAt, updatedAt }: any): User => {
  const userEntity = new User(id, email, verified, createdAt, updatedAt)

  return userEntity
}
