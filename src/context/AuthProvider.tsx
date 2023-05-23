import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {SIGN_IN, SIGN_UP} from '../graphql';
type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<any>({
  isUser: false,
  setIsUser: () => {},
  token: '',
  userid: '',
  setToken: () => {},
  setUserid: () => {},
});

export const AuthContextProvider = ({children}: Props) => {
  const [isUser, setIsUser] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loginGQL] = useMutation(SIGN_IN, {});
  const [register] = useMutation(SIGN_UP);
  async function login(email: string, password: string) {
    try {
      await loginGQL({
        variables: {email, password},
        onCompleted: async data => {
          const res = data?.signin;
          await AsyncStorage.setItem('userToken', res.token);
          await AsyncStorage.setItem('userId', res.user._id);
          setToken(res.token);
          setUserid(res.user._id);
          setUserInfo(res.user);
          setIsUser(true);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function signup(values: any) {
    try {
      await register({
        variables: {user: values},
        onCompleted: async data => {
          const res = data?.signup;
          await AsyncStorage.setItem('userToken', res.token);
          await AsyncStorage.setItem('userId', res.user._id);
          setToken(res.token);
          setUserid(res.user._id);
          setUserInfo(res.user);
          setIsUser(true);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function logout() {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    setToken(null);
    setUserid(null);
    setIsUser(false);
  }

  useEffect(() => {
    async function checkAuth() {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const userid = await AsyncStorage.getItem('userId');
        if (!token || !userid) {
          setIsUser(false);
        } else {
          setToken(userToken);
          setUserid(userid);
          setIsUser(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkAuth();
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isUser,
        userInfo,
        setUserInfo,
        setIsUser,
        setToken,
        setUserid,
        token,
        signup,
        userid,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
