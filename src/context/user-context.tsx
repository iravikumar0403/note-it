import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../config/supabaseClient";
import {
  children,
  loginFormValues,
  signupFormValues,
  userContextType,
  userType,
} from "../types";

const UserContext = createContext<userContextType>({
  user: null,
  signup: (values: signupFormValues) => new Promise(() => {}),
  login: (values: loginFormValues) => new Promise(() => {}),
  logout: () => {},
});

export const UserProvider = ({ children }: children) => {
  const [user, setUser] = useState<userType | null>(null);

  const login = async (values: loginFormValues) => {
    return new Promise(async (resolve, reject) => {
      const { user, error }: any = await supabase.auth.signIn(values);
      if (user) {
        setUser({ username: user.user_metadata.username, email: user.email });
        resolve({ username: user.user_metadata.username, email: user.email });
      }
      if (error) {
        toast.error(error.message);
        reject(error);
      }
    });
  };

  const signup = async (values: signupFormValues) => {
    return new Promise(async (resolve, reject) => {
      const { user, error }: any = await supabase.auth.signUp(
        {
          email: values.email,
          password: values.password,
        },
        {
          data: {
            username: values.username,
          },
        }
      );
      if (user) {
        setUser({ username: user.user_metadata.username, email: user.email });
        resolve({ username: user.user_metadata.username, email: user.email });
      }
      if (error) {
        toast.error(error.message);
        reject(error);
      }
    });
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
  };

  useEffect(() => {
    const usersession = localStorage.getItem("supabase.auth.token");

    if (usersession) {
      const session = JSON.parse(usersession);
      const user = {
        username: session.currentSession.user.user_metadata.username,
        email: session.currentSession.user.email,
      };

      setUser(user);
    }
  }, []);

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
      setUser(null);
    }
  });

  return (
    <UserContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
