import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import app from "../components/Authentication/Firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useLoginUserMutation, useLogoutUserMutation } from "../app/features/auth/authApi";
import { useGetMyProfileQuery } from "../app/features/user/userApi";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

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
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userInfoLoading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  userInfo: UserInfo | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | any>>;
  refetchUserInfo: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | any>([]);
  // console.log(user);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [loginUser] = useLoginUserMutation();
  const [logoutUserMutation] = useLogoutUserMutation();


  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name: string, photo: string) => {
    setLoading(true)
    if (!auth.currentUser) return Promise.reject("No user logged in");
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        await loginUser(currentUser.email).unwrap()
          .then(res => {
            console.log("login token", res.data);
            setLoading(false)
          })
      } else {
        setUser(currentUser);
        await logoutUserMutation(undefined).unwrap()
          .then(res => {
            console.log("logout", res.data)
            setLoading(false)
          })
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.displayName, user?.photoURL, axiosPublic]);

  //get user info from backend
  const { data: userProfileData, isLoading: userInfoLoading, refetch: refetchUserInfo } = useGetMyProfileQuery(undefined, {
    skip: !user?.email,
  });

  useEffect(() => {
    if (userProfileData?.data) {
      setUserInfo(userProfileData.data);
    }
  }, [userProfileData]);

  const authInfo: AuthContextType = {
    user,
    setUser,
    darkMode,
    setDarkMode,
    loading,
    setLoading,
    userInfoLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    userInfo: userProfileData?.data || userInfo,
    setUserInfo,
    refetchUserInfo,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
