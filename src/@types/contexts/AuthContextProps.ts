import { User, UserCredential } from "firebase/auth";

export interface AuthContextProps{
  user: LoginProps | null;
  isLogged: boolean
  login(email: string, password: string): Promise<UserCredential>
  logOut(): Promise<boolean>
}

export interface LoginProps {
  auth: User | null,
  data: {
    name: string;
    birthDate: string;
    lastName: string;
  }
}