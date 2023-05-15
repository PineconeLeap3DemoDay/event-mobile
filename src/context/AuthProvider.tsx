import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
type Props = {
    children: React.ReactNode
}
type AuthContextType = {
    isUser: boolean,
    setIsUser: React.Dispatch<React.SetStateAction<boolean>>,
    token: string,
    userid: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    setUserid: React.Dispatch<React.SetStateAction<string>>,
}
type User = {
    firstName: string
    lastName: string,
    email: string
}
const AuthContext = createContext<AuthContextType>({
    isUser: false,
    setIsUser: () => { },
    token: "",
    userid: "",
    setToken: () => { },
    setUserid: () => { }
});

export const AuthContextProvider = ({ children }: Props) => {
    const [isUser, setIsUser] = useState(false);
    const [token, setToken] = useState("");
    const [userid, setUserid] = useState("");
    const {currentUser} = useCurrentUser();
    async function checkAuth() {
        const token = await AsyncStorage.getItem('usertoken');
        const id = await AsyncStorage.getItem('userid');
        setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YXJpYW50IjoidXNlciIsImlkIjoiNjQ1MzVhMzNiNjYwMzAzZDE3NDc4YzhmIiwiaWF0IjoxNjg0MTE5MDgxLCJleHAiOjE2ODQyMDU0ODF9.P0JFtrYSAUcYr9aGDojuKtQaNSKgONoBx5OkIAsY2dU');
        setUserid('64535a33b660303d17478c8f')
        
        setIsUser(true)
    };
    useEffect(() => {
        checkAuth();
    }, [isUser])
    return (
        <AuthContext.Provider value={{ isUser, setIsUser, setToken, setUserid, token, userid }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);