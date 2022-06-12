import { LoginFormValues, SignupFormValues } from "./formValues.types";

export type User = {
  username: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  signup: (values: SignupFormValues) => Promise<unknown>;
  login: (values: LoginFormValues) => Promise<unknown>;
  logout: () => void;
};
