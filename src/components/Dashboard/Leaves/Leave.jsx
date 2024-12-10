import React, { useState, useEffect, useRef } from "react";
import styles from "./leave.module.css";
import { CiSearch } from "react-icons/ci";

import { CalendarTwo, Calender, Docs, Dots } from "../../../SVGIcon";
import { useAxiosInstance } from "../../../axiosInstance";
import profile from "../../../images/profile11.png";

export default function Leave() {
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [employee, setEmployee] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get("/employee/all");
        setEmployee(response.data.employees);
      } catch (error) {
        console.error("Error fetching Employee", error);
      }
    };

    fetchEmployee();
  }, [axiosInstance]);

  const handleDropdownToggle = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleStatusChange = async (EmployeeId, newStatus) => {
    try {
      await axiosInstance.put(`/employee/update-status/${EmployeeId}`, {
        status: newStatus,
      });

      setEmployee((prevEmployee) =>
        prevEmployee.map((employee) =>
          employee._id === EmployeeId
            ? { ...employee, status: newStatus }
            : employee
        )
      );

      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredEmployee = employee.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPosition =
      selectedPosition === "All" || employee.status === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  return (
    <div>
      <div className={styles.topContainer}>
        <div className={styles.filters}>
          <div>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className={styles.dropdownTwo}
            >
              <option value="All">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Work From Home">Work From Home</option>
            </select>
          </div>
        </div>

        <div className={styles.search}>
          <div className={styles.formControl}>
            <CiSearch className={styles.searchIcon} />
            <input
              id="search"
              className={styles.input}
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.leaveContainer}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Docs</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployee.length > 0 ? (
                filteredEmployee.map((employee, index) => (
                  <tr key={employee._id} className={styles.tableRow}>
                    <td>
                      <img
                        className={styles.profile}
                        src={profile}
                        alt="profile"
                      />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.joining}</td>
                    <td>{employee.department}</td>
                    <td>{employee.status}</td>
                    <td>
                      <Docs />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className={styles.emptyRow}>
                    No Employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainerTwo}>
          <div className={styles.leaveHeader}>
            <span style={{ marginLeft: "10px" }}>Leave Calendar</span>
          </div>
          <div className={styles.leaveContent}>
            <div className={styles.leaveFilters}>
              <button className={styles.todayButton}>Today</button>
              <div>
                <button className={styles.calenderButton}>
                  10/09/24
                  <span>
                    <CalendarTwo />
                  </span>
                </button>
              </div>
            </div>
            {filteredEmployee.length > 0 &&
              filteredEmployee.map((employee, index) => (
                <div className={styles.leavePeople}>
                  <div>
                    <img
                      className={styles.profile}
                      src={profile}
                      alt="profile"
                    />
                  </div>
                  <div className={styles.text}>{employee.name}</div>
                  <div className={styles.text}>{employee.joining}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
