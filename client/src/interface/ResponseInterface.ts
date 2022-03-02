import { UserInterface } from "./UserInterface";
export interface ResponseInterface {
  statusCode?: number;
  message?: string;
  error?: string;
  user: UserInterface;
  payload: {
    authLevel: string;
    email: string;
    exp: number;
    iat: number;
    sub: string;
  };
}
