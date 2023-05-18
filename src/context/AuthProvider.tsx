import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GET_USER, SIGN_IN } from "../graphql";
import { useNavigation } from "@react-navigation/native";
type Props = {
    children: React.ReactNode
}
// type AuthContextType = {
//     isUser: boolean,
//     setIsUser: React.Dispatch<React.SetStateAction<boolean>>,
//     token: string,
//     userid: string,
//     setToken: React.Dispatch<React.SetStateAction<string>>,
//     setUserid: React.Dispatch<React.SetStateAction<string>>,
// }
// type User = {
//     firstName: string
//     lastName: string,
//     email: string
// }
const AuthContext = createContext<any>({
    isUser: false,
    setIsUser: () => { },
    token: "",
    userid: "",
    setToken: () => { },
    setUserid: () => { }
});

export const AuthContextProvider = ({ children }: Props) => {
    const [isUser, setIsUser] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [userid, setUserid] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loginGQL, { loading,}] = useMutation(SIGN_IN, {
      });
    async function login(email: string, password: string) {
        try {
            await loginGQL({variables: {email, password} ,onCompleted: async(data) =>{ 
                const res = data?.signin;
                console.log(res,'res')
                await AsyncStorage.setItem('userToken', res.token);
                await AsyncStorage.setItem('userId', res.user._id);
                setToken(res.token);
                setUserid(res.user._id);
                setUserInfo(res.user);
                setIsUser(true);
            },});
        } catch (error) {
        }
        
    }
    async function logout() {
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('userId')
        setToken(null);
        setUserid(null);
        setIsUser(false);
    }
    async function checkAuth() {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const userid = await AsyncStorage.getItem('userId');
            setToken(userToken);
            setUserid(userid);
            setIsUser(true)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        checkAuth();
    }, []);
    return (
        <AuthContext.Provider value={{ login,logout,isUser,userInfo,setUserInfo, setIsUser, setToken, setUserid, token, userid }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);