import { User } from "../../domain/user.entity";
import { newUserDto } from "../dto/newUser.dto";

export const fromNewUserDtoToEntity = ({
  email,
  name,
  hash,
}: newUserDto): User => {
  const userEntity = new User(undefined, email, name, hash);

  return userEntity;
};
