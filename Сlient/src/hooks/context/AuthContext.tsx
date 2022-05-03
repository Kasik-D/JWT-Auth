import React, { useEffect } from 'react';
import { IUser } from '../../models/IUser';
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { AuthResponce } from '../../models/response/AuthResponce';
import { API_URL } from '../../api';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  isAuth: boolean;
  userData: IUser;
  loading: boolean;
  login: (email: string, password: string) => Promise<void> | void;
  registration: (email: string, password: string) => Promise<void> | void;
  logout: () => Promise<void> | void;
};

export const AuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [userData, setUserData] = React.useState<IUser>({} as IUser);
  const [loading, setLoading] = React.useState(false);

  const handleSetAuth = (auth: boolean) => setIsAuth(auth);
  const handleSetUser = (user: IUser) => setUserData(user);

  const login = async (email: string, password: string) => {
    try {
      const responce = await AuthService.login(email, password);
      localStorage.setItem('token', responce.data.accessToken);
      handleSetAuth(true);
      handleSetUser(responce.data.user);
    } catch (error: any) {
      console.log('error', error?.responce?.data?.message);
    }
  };

  const registration = async (email: string, password: string) => {
    try {
      const responce = await AuthService.registration(email, password);
      localStorage.setItem('token', responce.data.accessToken);
      handleSetAuth(true);
      handleSetUser(responce.data.user);
    } catch (error: any) {
      console.log('error', error?.responce?.data?.message);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      handleSetAuth(false);
      handleSetUser({} as IUser);
    } catch (error: any) {
      console.log('error', error?.responce?.data?.message);
    }
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const responce = await axios.get<AuthResponce>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', responce.data.accessToken);
      handleSetAuth(true);
      handleSetUser(responce.data.user);
    } catch (error: any) {
      console.log('error', error?.responce?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    isAuth,
    userData,
    loading,
    login,
    registration,
    logout,
  };

  return <AuthContex.Provider value={value}>{children}</AuthContex.Provider>;
};

export const AuthContex = React.createContext<ContextProps>({
  isAuth: false,
  userData: {} as IUser,
  loading: false,
  login: () => {},
  registration: () => {},
  logout: () => {},
});

export function useAuthContext() {
  const authContext = React.useContext(AuthContex);
  if (!authContext) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return authContext;
}
