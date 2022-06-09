import * as Yup from "yup";
export const signupValidationSchema = Yup.object({
  username: Yup.string().required("Required").max(25),
  email: Yup.string().required("Required").email(),
  password: Yup.string().required("Required").min(6),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().required("Required").email(),
  password: Yup.string().required("Required"),
});
