import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Enter a valid first name")
    .max(10, "Enter a valid first name"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Enter a valid last name")
    .max(10, "Enter a valid last name"),
  age: yup.number().required().min(15).max(60),
  email: yup.string().email("Invalid email").required(),
  password: yup
    .string()
    .required("Please enter a valid password")
    .min(8)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const registerdUsers = [];

const verifyUserSignUp = (data) => {
  let users = JSON.parse(localStorage.getItem("registerdUsers"));
  // console.log(users);
  if (users === null) {
    return true;
  }
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.email === data.email) {
      return false;
    }
  }
  return true;
};

export const SignUp = ({ history }) => {
  const [formError, setFormError] = useState("");

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          age: "",
          gender: "Male",
          email: "",
          password: "",
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          if (verifyUserSignUp(data)) {
            toast.success("Registration successfull", {
              closeOnClick: true,
              transition: Flip,
            });
            let user = {
              firstName: data.firstName,
              email: data.email,
              password: data.password,
              age: data.age,
            };
            registerdUsers.push(user);
            // console.log(registerdUsers);
            localStorage.setItem(
              "registerdUsers",
              JSON.stringify(registerdUsers)
            );
            setSubmitting(false);
            history.push("/login");
          } else {
            toast.error("Please login", {
              position: "bottom-right",
              closeOnClick: true,
              transition: Flip,
            });
            setFormError("User already exists");
          }
        }}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <div>
            <h1>Sign Up Form</h1>
            <div className="login-container">
              <Form>
                <Field
                  type="input"
                  name="firstName"
                  placeholder="First name"
                  className="Text-field"
                />
                <ErrorMessage name="firstName">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <Field
                  type="input"
                  name="lastName"
                  placeholder="Last name"
                  className="Text-field"
                />
                <ErrorMessage name="lastName">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <Field
                  type="input"
                  name="age"
                  placeholder="Age"
                  className="Text-field"
                />
                <ErrorMessage name="age">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <div>
                  <label className="label">
                    <Field
                      name="gender"
                      value="Male"
                      type="radio"
                      className="radio"
                    />
                    Male
                  </label>
                  <label className="label">
                    <Field name="gender" value="Female" type="radio" />
                    Female
                  </label>
                </div>
                <Field
                  type="input"
                  name="email"
                  placeholder="Email"
                  className="Text-field"
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="Text-field"
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <button type="submit">Register</button>
                <button
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  Clear
                </button>
                <div>
                  <div className="text">Already have an account?</div>
                  <button
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Login
                  </button>
                </div>
              </Form>
              {formError.length < 1 ? (
                ""
              ) : (
                <div className="error-message">{formError}</div>
              )}
            </div>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(localStorage.getItem("users"), null, 3)}</pre> */}
          </div>
        )}
      </Formik>
    </div>
  );
};
