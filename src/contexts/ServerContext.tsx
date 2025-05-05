import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { ServerContextProps } from "../@types/contexts/ServerContextProps";
import { ContextProps } from "../@types/contexts/contextProps";
import { UserProps } from "../@types/models/UserProps";
import { useSnackbar } from "./SnackbarContext";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const ServerContext = createContext<ServerContextProps>({} as ServerContextProps)

export const ServerProvider: React.FC<ContextProps> = ({children}) => {
  const {logOut, login} = useAuth();
  const {handleOpen} = useSnackbar();

  const requestWrapper: <T>(cb: any) => Promise<T> = async (cb) => {
    try{
      return await cb()
    }catch(error: any){
      if(error.code == "auth/invalid-credential"){
        handleOpen("invalid credential", "error")
      }else{
        handleOpen(error?.response?.data?.message, "error")
        if(error.response.data.statusCode == 401){logOut()}
      }
    }
  }
  const userLogin = (email: string, password: string) => requestWrapper<UserCredential>(async () => {
    const result = login(email, password);
    return result;
  })

  const userCreate = (request: UserProps) => requestWrapper<UserCredential>(async () => {
    const {user} = await createUserWithEmailAndPassword(auth, request.email, request.password);
    await setDoc(doc(db, 'users', user.uid), {
      name: request.name,
      lastName: request.lastName,
      birthDate: new Date(request.birthDate).getTime(),
    })
    login(request.email, request.password);
  })
  
  return (
    <ServerContext.Provider value={{
      userCreate,
      userLogin
    }}>
      {children}
    </ServerContext.Provider >
  );
}

export function useServer(){
  const context = useContext(ServerContext);
  return context;
}