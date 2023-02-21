import { User } from "../../domain/user.entity";

export const fromModelToEntity = ({
  id,
  email,
  name,
  lastName,
  hash,
  verified,
  role,
  createdAt,
  updatedAt,
}: any): User => {

 
  const userEntity = new User(
    email,
    name,
    lastName,
    id,
    hash,
    verified,
    role,
    createdAt,
    updatedAt
  );

  return userEntity;
};
