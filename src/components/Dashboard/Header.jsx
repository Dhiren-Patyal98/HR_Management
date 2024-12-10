import React from "react";
import { DropDown, Notification, Mail } from "../../SVGIcon";
import styles from "./header.module.css";
import profile from "../../images/profile11.png";

export default function Header({ selected }) {
  return (
    <>
      <div className={styles.contentSideHeader}>
        <div className={styles.contentDynamic}>
          {selected === "candidates" && <span> Candidates</span>}
          {selected === "employees" && <span> Employees</span>}
          {selected === "attendance" && <span> Attendance</span>}
          {selected === "leaves" && <span> Leaves</span>}
        </div>
        <div className={styles.notificationSide}>
          <div>
            <Mail />
          </div>
          <div>
            <Notification />
          </div>
          <div>
            <img className={styles.profile} src={profile} alt="profile" />
          </div>
          <div>
            <DropDown />
          </div>
        </div>
      </div>
    </>
  );
}
