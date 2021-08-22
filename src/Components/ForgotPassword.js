import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

const handleResetPassword = (data) => {
  const users = JSON.parse(localStorage.getItem("registerdUsers"));
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email === data.email) {
      user.password = data.password;
      return true;
    } else {
      return false;
    }
  }
};

const notify = (status) => {
  if (status) {
    toast.success("Password reset successful", {
      closeOnClick: true,
      transition: Flip,
    });
  } else {
    toast.error("Password reset failed", {
      closeOnClick: true,
      transition: Flip,
    });
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

toast.configure();
export const Forgotpassword = (props) => {
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          if (handleResetPassword(data)) {
            notify(true);
            props.history.push("/login");
          } else {
            notify(false);
          }
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, isSubmitting }) => (
          <div>
            <div className="login-container">
              <Form>
                <h2>Reset Password</h2>
                <Field
                  name="email"
                  type="input"
                  placeholder="Enter your email"
                  className="Text-field "
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                  className="Text-field "
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
                <button disabled={isSubmitting} type="submit">
                  Reset Password
                </button>
              </Form>
              <Link className="link" to="/login">
                Go back to Login
              </Link>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
