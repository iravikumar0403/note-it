import { loginFormValues, signupFormValues } from "./formValues.types";

export type userType = {
  username: string;
  email: string;
};

export type userReducerAction = {
  type: string;
  payload: userType | null;
};

export type userContextType = {
  user: userType | null;
  signup: (values: signupFormValues) => Promise<unknown>;
  login: (values: loginFormValues) => Promise<unknown>;
  logout: () => void;
};
