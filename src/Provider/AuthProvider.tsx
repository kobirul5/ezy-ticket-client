import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLoginUserMutation, useLogoutUserMutation } from "../app/features/auth/authApi";
import { useGetMyProfileQuery } from "../app/features/user/userApi";

interface UserInfo {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  phone?: string;
  address?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: any | null;
  setUser: Dispatch<SetStateAction<any | null>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userInfoLoading: boolean;
  logOut: () => Promise<void>;
  userInfo: UserInfo | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | any>>;
  refetchUserInfo: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [logoutUserMutation] = useLogoutUserMutation();

  const logOut = async () => {
    setLoading(true);
    try {
      await logoutUserMutation(undefined).unwrap();
      setUser(null);
      setUserInfo(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  //get user info from backend
  const { data: userProfileData, isLoading: userInfoLoading, refetch: refetchUserInfo } = useGetMyProfileQuery(undefined);

  useEffect(() => {
    if (userProfileData?.data) {
      setUserInfo(userProfileData.data);
      setUser(userProfileData.data); // Setting basic user info from backend profile
    } else if (!userInfoLoading) {
      setUser(null);
      setUserInfo(null);
    }
  }, [userProfileData, userInfoLoading]);

  const authInfo: AuthContextType = {
    user,
    setUser,
    darkMode,
    setDarkMode,
    loading,
    setLoading,
    userInfoLoading,
    logOut,
    userInfo: userProfileData?.data || userInfo,
    setUserInfo,
    refetchUserInfo,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
