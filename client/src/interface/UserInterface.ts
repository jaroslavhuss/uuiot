import {IError} from "./error.interface"
import { TokenInterface } from "./TokenInterface";
export interface UserInterface extends IError{
  authLevel: string;
  createdAt: Date;
  email: string;
  isUserApproved: boolean;
  lastLoggedIn: Date;
  name: string;
  surname: string;
  updatedAt: Date;
  __v: number;
  _id: string;
  user?:UserInterface,
  tokens:TokenInterface
}
