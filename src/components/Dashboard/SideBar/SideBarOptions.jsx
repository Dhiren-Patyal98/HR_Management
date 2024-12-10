import React from "react";
import styles from "./sideBarOptions.module.css";
import { useDispatch } from "react-redux";
import { SET_SELECTED } from "../../../redux/actions/sideBarAction";
import { UserAddSVG, UserGroup, Signal, Shine, Logout } from "../../../SVGIcon";
import { useNavigate } from "react-router-dom";
import { useAxiosInstance } from "../../../axiosInstance";

export default function SideBarOptions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOptionClick = (option) => {
    dispatch(SET_SELECTED(option));
  };
  const axiosInstance = useAxiosInstance();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/logout");

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");

        navigate("/");
      } else {
        throw new Error("Unexpected server response during logout.");
      }
    } catch (error) {
      console.error("Error during logout:", error);

      if (error.response) {
        alert(
          error.response.data.message || "Failed to logout. Please try again."
        );
      } else if (error.request) {
        alert("Network error. Please check your internet connection.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.head}>
      <div className={styles.title}>
        Recruitment
        <div
          className={styles.content}
          onClick={() => handleOptionClick("candidates")}
        >
          <span className={styles.contentIcon}>
            <UserAddSVG />
          </span>
          Candidates
        </div>
      </div>

      <div className={styles.title}>
        Organization
        <div
          className={styles.content}
          onClick={() => handleOptionClick("employees")}
        >
          <span className={styles.contentIcon}>
            <UserGroup />
          </span>
          Employees
        </div>
        <div
          className={styles.content}
          onClick={() => handleOptionClick("attendance")}
        >
          <span className={styles.contentIcon}>
            <Signal />
          </span>
          Attendance
        </div>
        <div
          className={styles.content}
          onClick={() => handleOptionClick("leaves")}
        >
          <span className={styles.contentIcon}>
            <Shine />
          </span>
          <span style={{ marginBottom: "20px" }}>Leaves</span>
        </div>
      </div>

      <div className={styles.title}>
        Others
        <div
          className={styles.contentLast}
          onClick={() => {
            handleLogout();
          }}
        >
          <span className={styles.contentIcon}>
            <Logout />
          </span>
          log out
        </div>
      </div>
    </div>
  );
}
