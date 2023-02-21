import { User } from "../../domain/user.entity";
import { UserDto } from "../dto/user.dto";

export const fromEntityToUserDto = ({
  id,
  email,
  name,
  lastName,
}: User): UserDto => {
  const userDto = new UserDto({ id: Number(id), email, name, lastName });
  return userDto;
};
