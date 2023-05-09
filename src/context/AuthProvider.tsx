import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
type Props = {
    children: React.ReactNode
}
type AuthContextType = {
    isUser: boolean,
    setIsUser: React.Dispatch<React.SetStateAction<boolean>>,
    token: string,
    userid: string
}
const AuthContext = createContext<AuthContextType>({
    isUser: false,
    setIsUser: () => { },
    token: "",
    userid: ""
});

export const AuthContextProvider = ({ children }: Props) => {
    const [isUser, setIsUser] = useState(false);
    const [token, setToken] = useState("");
    const [userid, setUserid] = useState("")
    async function getUserToken() {
        const token = await AsyncStorage.getItem('usertoken');
        const id = await AsyncStorage.getItem('userid');
        // console.log(token==="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YXJpYW50IjoidXNlciIsImlkIjoiNjQ1MzVhMzNiNjYwMzAzZDE3NDc4YzhmIiwiaWF0IjoxNjgzNTkyMjczLCJleHAiOjE2ODM2Nzg2NzN9.h3Yn7b4ZVafkp7AGNnoRVX1H4O0q2CXNxZMfFKTg-RQ");
        setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YXJpYW50IjoidXNlciIsImlkIjoiNjQ1MzVhMzNiNjYwMzAzZDE3NDc4YzhmIiwiaWF0IjoxNjgzNTkyMjczLCJleHAiOjE2ODM2Nzg2NzN9.h3Yn7b4ZVafkp7AGNnoRVX1H4O0q2CXNxZMfFKTg-RQ" as string);
        setUserid("64535a33b660303d17478c8f" as string)
        setIsUser(true)
    };
    useEffect(() => {
        getUserToken();
    }, [])
    return (
        <AuthContext.Provider value={{ isUser, setIsUser, token , userid}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);