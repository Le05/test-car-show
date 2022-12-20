import { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./authFunctions";
import { IAuthProvider, IAuthContext, IUser } from "./types";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user)
      setUser(user);

    setLoading(false);
  }, []);


  async function authenticate(email: string, password: string) {
    
    const user:IUser = await LoginRequest(email, password)
    
    setUser(user);
    setUserLocalStorage(user);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ user, authenticate, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}