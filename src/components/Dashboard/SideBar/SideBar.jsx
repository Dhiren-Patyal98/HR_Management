import React from "react";
import logo from "../../../images/Rectangle 2.png";
import styles from "./sideBar.module.css";
import { CiSearch } from "react-icons/ci";
export default function SideBar() {
  return (
    <div className={styles.sidebarHead}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
        LOGO
      </div>

      <div className={styles.formControl}>
        <CiSearch className={styles.searchIcon} />
        <input id="search" className={styles.input} placeholder="Search" />
      </div>
    </div>
  );
}
