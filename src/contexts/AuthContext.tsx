import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ContextProps } from "../@types/contexts/contextProps";
import { AuthContextProps, LoginProps } from "../@types/contexts/AuthContextProps";
import { NextFn, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextProps["user"]>(null);
  const [isLogged, setIsLogged] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser: NextFn<User | null> = async (user) => {
    if(user){
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if(userDoc.exists()){
        const userData = userDoc.data();
        setUser({
          auth: user,
          data: userData as LoginProps["data"]
        });
        setIsLogged(true)
      }
    }else{
      setUser(null);
      setIsLogged(false)
    }
  }

  async function login(email: string, password: string){
    const retult = await signInWithEmailAndPassword(auth, email, password);
    return retult;
  }

  async function logOut(){
    await auth.signOut();
    return true;
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLogged,
      login,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
};