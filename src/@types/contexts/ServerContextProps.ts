import { UserCredential } from "firebase/auth";
import { UserProps } from "../models/UserProps";

export interface ServerContextProps{
  userCreate: (user: UserProps) => Promise<UserCredential>
  userLogin: (email: string, password: string) => Promise<UserCredential>
}