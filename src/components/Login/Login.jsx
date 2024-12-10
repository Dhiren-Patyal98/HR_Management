import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.css";
import SlickSlider from "./SlickSlider";
import logo from "../../images/Rectangle 2.png";
import { useAxiosInstance } from "../../axiosInstance";
import { Eye } from "../../SVGIcon";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object(
      isRegister
        ? {
            name: Yup.string().required("Full Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm Password is required"),
          }
        : {
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          }
    ),
    onSubmit: async (values) => {
      try {
        if (isRegister) {
          const { name, email, password } = values;
          const response = await axiosInstance.post("/user/register", {
            name,
            email,
            password,
          });
          alert("Register successful!");
          formik.resetForm();
          setIsRegister(false);
        } else {
          const { email, password } = values;
          const response = await axiosInstance.post("/user/login", {
            email,
            password,
          });

          const token = response.data.token;
          const decoded = JSON.parse(atob(token.split(".")[1]));
          const expiryTime = decoded.exp * 1000;

          localStorage.setItem("token", token);
          localStorage.setItem("tokenExpiry", expiryTime);

          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error during form submission:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong!");
        }
      }
    },
  });

  return (
    <div className={styles.loginHeadContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.loginFormContainer}>
          <div className={styles.logo}>
            <img src={logo} alt="" /> LOGO
          </div>
          <div className={styles.form}>
            <span className={styles.text}>Welcome to Dashboard</span>
            <form onSubmit={formik.handleSubmit}>
              {isRegister && (
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className={styles.error}>{formik.errors.name}</div>
                  ) : null}
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className={styles.error}>{formik.errors.email}</div>
                ) : null}
              </div>

              <div className={styles.inputGroup} style={{ width: "" }}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Eye />
                  </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className={styles.error}>{formik.errors.password}</div>
                ) : null}
              </div>

              {isRegister && (
                <div className={styles.inputGroup} style={{ width: "" }}>
                  <label htmlFor="confirmPassword">Password</label>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={showPasswordTwo ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      className={styles.eyeIcon}
                      onClick={() => setShowPasswordTwo((prev) => !prev)}
                    >
                      <Eye />
                    </span>
                  </div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className={styles.error}>
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              )}

              <button type="submit" className={styles.submitButton}>
                {isRegister ? "Register" : "Login"}
              </button>
            </form>

            <div>
              {isRegister ? (
                <>
                  <span className={styles.linkText}>
                    Already have an account?
                  </span>

                  <span
                    className={styles.toggleLink}
                    onClick={() => {
                      setIsRegister(false);
                      formik.resetForm();
                    }}
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.linkText}>
                    Don't have an account?
                  </span>

                  <span
                    className={styles.toggleLink}
                    onClick={() => {
                      setIsRegister(true);
                      formik.resetForm();
                    }}
                  >
                    Register
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.crousor}>
          <SlickSlider />
        </div>
      </div>
    </div>
  );
}
