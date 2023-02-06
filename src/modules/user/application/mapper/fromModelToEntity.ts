import { User } from "../../domain/user.entity";

export const fromModelToEntity = ({
  id,
  email,
  name,
  hash,
  verified,
  role,
  createdAt,
  updatedAt,
}: any): User => {

 
  const userEntity = new User(
    email,
    name,
    id,
    hash,
    verified,
    role,
    createdAt,
    updatedAt
  );

  return userEntity;
};
