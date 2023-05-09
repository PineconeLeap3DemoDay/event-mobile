import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
type Props = {
    children: React.ReactNode
}
type AuthContextType = {
    isUser: boolean,
    setIsUser: React.Dispatch<React.SetStateAction<boolean>>,
    token: string
}
const AuthContext = createContext<AuthContextType>({
    isUser: false,
    setIsUser: () => { },
    token: ""
});

export const AuthContextProvider = ({ children }: Props) => {
    const [isUser, setIsUser] = useState(false);
    const [token, setToken] = useState("");
    async function getUserToken() {
        const token = await AsyncStorage.getItem('usertoken');
        setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YXJpYW50IjoidXNlciIsImlkIjoiNjQ1MzVhMzNiNjYwMzAzZDE3NDc4YzhmIiwiaWF0IjoxNjgzNTkyMjczLCJleHAiOjE2ODM2Nzg2NzN9.h3Yn7b4ZVafkp7AGNnoRVX1H4O0q2CXNxZMfFKTg-RQ" as string);
        setIsUser(true)
    };
    useEffect(() => {
        getUserToken();
    }, [])
    return (
        <AuthContext.Provider value={{ isUser, setIsUser, token }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);