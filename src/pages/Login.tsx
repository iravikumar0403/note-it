import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ButtonWithLoader, Footer, Navbar } from "../components";
import { useUserContext } from "../context/user-context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { LoginFormValues } from "../types";
import { loginValidationSchema } from "../utils";

const initialFormValues = {
  email: "",
  password: "",
};

export const Login = () => {
  useDocumentTitle("Login / Note It");
  const { user, login } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    login(values).finally(() => setIsLoading(false));
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    login({ email: "demouser@email.com", password: "demo123" }).finally(() =>
      setIsLoading(false)
    );
  };

  if (user) {
    return <Navigate to={"/dashboard/notes"} replace />;
  }
  return (
    <div className="flex flex-col h-screen">
      <Navbar logoOnly={true} />
      <div className="flex justify-center m-auto">
        <div className="w-full max-w-[30rem]">
          <h1 className="text-2xl pb-5 text-center">Login</h1>
          <Formik
            initialValues={initialFormValues}
            onSubmit={handleSubmit}
            validationSchema={loginValidationSchema}
          >
            <Form className="flex flex-col p-8 rounded bg-white dark:bg-slate-800">
              <div className="mb-3">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                  placeholder="Email"
                />
                <p className="text-red-500">
                  <ErrorMessage name="email" />
                </p>
              </div>
              <div className="mb-3">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                  placeholder="Password"
                />
                <p className="text-red-500">
                  <ErrorMessage name="password" />
                </p>
              </div>
              <ButtonWithLoader
                isLoading={isLoading}
                type="submit"
                className="btn-primary py-2 my-2 flex justify-center items-center"
              >
                Login
              </ButtonWithLoader>
              <ButtonWithLoader
                type="button"
                isLoading={isLoading}
                className="btn-secondary py-2 my-2 flex justify-center items-center"
                onClick={handleGuestLogin}
              >
                Login as guest
              </ButtonWithLoader>
              <div className="flex justify-center mt-2">
                <p className="mr-3">Don't have an account yet?</p>
                <Link className="text-teal-500 underline" to="/signup">
                  Signup
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};
