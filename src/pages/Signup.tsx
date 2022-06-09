import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ButtonWithLoader, Footer, Navbar } from "../components";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { signupFormValues } from "../types";
import { signupValidationSchema } from "../utils";
import { useUserContext } from "../context/user-context";

const formInitialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Signup = () => {
  useDocumentTitle("Signup / Note It");
  const [isLoading, setIsLoading] = useState(false);
  const { user, signup } = useUserContext();

  const handleSubmit = async (values: signupFormValues) => {
    setIsLoading(true);
    signup(values).finally(() => setIsLoading(false));
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar logoOnly={true} />
      <div className="flex justify-center m-auto">
        <div className="w-full max-w-[30rem]">
          <h1 className="text-2xl pb-5 text-center">Signup</h1>
          <Formik
            initialValues={formInitialValues}
            onSubmit={handleSubmit}
            validationSchema={signupValidationSchema}
          >
            <Form className="flex flex-col p-8 mb-10 rounded bg-white dark:bg-slate-800">
              <div className="mb-3 items-center">
                <label className="block" htmlFor="username">
                  Name
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                  placeholder="Name"
                />
                <p className="text-red-500">
                  <ErrorMessage name="username" className="text-red-300" />
                </p>
              </div>

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
                  <ErrorMessage name="email" className="text-red-300" />
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
                  <ErrorMessage name="password" className="text-red-300" />
                </p>
              </div>
              <div className="mb-3">
                <label className="block" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                  placeholder="Confirm Password"
                />
                <p className="text-red-500">
                  <ErrorMessage
                    name="confirmPassword"
                    className="text-red-300"
                  />
                </p>
              </div>
              <ButtonWithLoader
                className="flex items-center justify-center btn-primary my-2"
                type="submit"
                value="Signup"
                isLoading={isLoading}
              >
                Signup
              </ButtonWithLoader>
              <div className="flex justify-center mt-2">
                <p className="mr-3">Already a user?</p>
                <Link className="text-teal-500 underline" to="/login">
                  Login
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
