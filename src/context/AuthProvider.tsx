import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
type Props = {
    children: React.ReactNode
}
type AuthContextType = {
    isUser: boolean,
    setIsUser: React.Dispatch<React.SetStateAction<boolean>>,
    token: string,
    userid: string,
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
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
    user: {
        firstName: "", 
        lastName: "",
        email: ""
    },
    setUser: () => {},
    setToken: () => { },
    setUserid: () => { }
});

export const AuthContextProvider = ({ children }: Props) => {
    const [isUser, setIsUser] = useState(false);
    const [token, setToken] = useState("");
    const [userid, setUserid] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    async function getUserToken() {
        const token = await AsyncStorage.getItem('usertoken');
        const id = await AsyncStorage.getItem('userid');
        setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YXJpYW50IjoidXNlciIsImlkIjoiNjQ1MzVhMzNiNjYwMzAzZDE3NDc4YzhmIiwiaWF0IjoxNjgzODY0MTA5LCJleHAiOjE2ODM5NTA1MDl9.bt3ajJ_Pdq4rx_TLO5zQPismZRlCvCnHgKLV6Uja9dI" as string);
        setUserid('64535a33b660303d17478c8f' as string)
        setIsUser(true)
    };
    useEffect(() => {
        getUserToken();
    }, [])
    return (
        <AuthContext.Provider value={{ isUser,user ,setUser, setIsUser, setToken, setUserid, token, userid }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);