import { User } from "../models/user.model";

export interface UsersBoContract {
  regUser(user: User): Promise<User>;
  validate(user: User): Promise<string>;
}
