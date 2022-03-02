import { UserInterface } from "./UserInterface";
export interface authStateInterface {
  error: null;
  isAuthenticated: boolean;
  loading: boolean;
  subjects: [];
  token: string;
  user: UserInterface;
}
