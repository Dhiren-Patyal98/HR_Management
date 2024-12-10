import React from "react";
import { useSelector } from "react-redux";
import SideBar from "./SideBar/SideBar";
import styles from "./dashboard.module.css";
import SideBarOptions from "./SideBar/SideBarOptions";
import Header from "./Header";
import Candidates from "./Candidates/Candidates";
import Employee from "./Employees/Employee";
import Attendance from "./Attendance/Attendance";
import Leave from "./Leaves/Leave";

export default function Dashboard() {
  const { selected } = useSelector((state) => state.sidebar);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sideBar}>
        <SideBar />
        <SideBarOptions />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.contentSide}>
          <Header selected={selected} />
        </div>
        <div className={styles.content}>
          {selected === "candidates" && <Candidates />}
          {selected === "employees" && <Employee />}
          {selected === "attendance" && <Attendance />}
          {selected === "leaves" && <Leave />}
        </div>
      </div>
    </div>
  );
}
