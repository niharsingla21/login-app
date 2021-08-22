import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const verifyUser = (data) => {
  let registerdUsers = JSON.parse(localStorage.getItem("registerdUsers"));

  if (registerdUsers === null || registerdUsers === []) {
    return null;
  }

  for (let i = 0; i < registerdUsers.length; i++) {
    let user = registerdUsers[i];
    if (user.email === data.email && user.password === data.password) {
      return user;
    }
    return null;
  }
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Please enter a valid password")
    .min(8)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export const Login = (props) => {
  const [formError, setFormError] = useState("");

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(data) => {
          let user = verifyUser(data);

          if (user != null) {
            toast.success("Login successful", {
              transition: Flip,
              closeOnClick: true,
            });
            localStorage.setItem("userName", user.firstName);
            props.history.push({
              pathname: "/home",
              state: {
                firstName: user.firstName,
                email: user.email,
                age: user.age,
              },
            });
          } else {
            toast.error("User does not exist", {
              position: "bottom-left",
              transition: Flip,
              closeOnClick: true,
            });
            setFormError("Please sign up first");
          }
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <div>
            <h1>Login</h1>
            <div className="login-container">
              <Form>
                <Field
                  name="email"
                  type="input"
                  placeholder="Enter your email"
                  className="Text-field"
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="Text-field"
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <button type="submit">Login</button>
                <button
                  onClick={() => {
                    props.history.push("/myApp");
                  }}
                >
                  Sign Up
                </button>
                {formError.length > 1 ? (
                  <div className="error-message">{formError}</div>
                ) : (
                  ""
                )}
              </Form>
              <div>
                <Link to="/forgotPassword" className="link">
                  Forgot Password ?
                </Link>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
