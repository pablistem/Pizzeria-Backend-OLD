import { User } from "../../domain/user.entity";

export const fromModelToEntity = ({
  id,
  email,
  name,
  hash,
  verified,
  createdAt,
  updatedAt,
}: any): User => {
  const userEntity = new User(
    id,
    email,
    name,
    hash,
    verified,
    createdAt,
    updatedAt
  );

  return userEntity;
};
