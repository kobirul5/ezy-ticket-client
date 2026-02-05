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
import app from "../Pages/Authentication/Firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery, QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

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
  refetchUserInfo: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | any>([]);
  // console.log(user);
  const [loading, setLoading] = useState(true);
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();


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
        await axiosPublic.post('/jwt',
          { email: currentUser.email },
          { withCredentials: true }
        )
          .then(res => {
            console.log('login token', res.data);
            setLoading(false)
          })
      } else {
        setUser(currentUser);
        await axiosPublic.post('/logout',
          {},
          {
            withCredentials: true,
          }
        )
          .then(res => {
            console.log('logout', res.data)
            setLoading(false)
          })
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.displayName, user?.photoURL, axiosPublic]);

  //get user info from mongodb
  const { data: userData, refetch: refetchUserInfo } = useQuery({
    queryKey: ['savedUser', user?.email],
    queryFn: async () => {
      setUserInfoLoading(true);
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user.email}`);
      setUserInfo(res.data[0]);
      setUserInfoLoading(false);
      return res.data[0];
    },
    enabled: !!user?.email,
  });

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
    userInfo: userData || userInfo,
    setUserInfo,
    refetchUserInfo,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
