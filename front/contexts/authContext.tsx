import React, { createContext, useState} from "react";
import { AuthContextType } from "../tipos/tipos";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: '',
    login: () => {},
    logout: () => {},
});

const tokenMockado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE2ODM3NjF9.8dNG7mOzp7Z86haEER-8nHeODNgnbJ2enVSk9oikQPA'
export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string|null>(tokenMockado);

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
