import React, { createContext, useState} from "react";
import { AuthContextType } from "../tipos/tipos";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: '',
    login: () => {},
    logout: () => {},
  });

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string|null>(null);

    const login = (userData:any, authToken:string) => {
        setUser(userData);
        setToken(authToken);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
    }

    return(
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
