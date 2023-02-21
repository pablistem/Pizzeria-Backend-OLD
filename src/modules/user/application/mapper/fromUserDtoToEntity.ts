import { User } from "../../domain/user.entity";
import { UserDto } from "../dto/user.dto";

export const fromUserDtoToEntity = ({
  id,
  email,
  name,
  lastName,
}: UserDto): User => {
  const userEntity = new User( email, name,lastName, id );
  return userEntity;
};
