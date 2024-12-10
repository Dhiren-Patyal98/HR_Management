import React, { useState, useEffect, useRef } from "react";
import styles from "./employee.module.css";
import { CiSearch } from "react-icons/ci";

import { Dots } from "../../../SVGIcon";
import { useAxiosInstance } from "../../../axiosInstance";
import profile from "../../../images/profile11.png";
import AddEmployee from "./AddEmployee";

export default function Employee() {
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [employee, setEmployee] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
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

  const handleEdit = async (id) => {
    const employeeToEdit = employee.find((emp) => emp._id === id);
    setEditEmployeeData(employeeToEdit);
    setIsDialogOpen(true);
    setDropdownOpen(null);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/employee/delete/${id}`);
      setEmployee((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate._id !== id)
      );
      alert("Candidate deleted successfully");
    } catch (error) {
      console.error("Error deleting candidate", error);
      alert("Failed to delete candidate");
    }
    setDropdownOpen(null);
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
      selectedPosition === "All" || employee.department === selectedPosition;
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
              <option value="Designer">Designer</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Human Resource">Human Resource</option>
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
          <div>
            <button
              className={styles.customButton}
              onClick={() => setIsDialogOpen(true)}
            >
              Add New Employee
            </button>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <AddEmployee
          closeDialog={() => {
            setIsDialogOpen(false);
            setEditEmployeeData(null);
          }}
          employeeData={editEmployeeData}
        />
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th></th>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of joining</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployee.length > 0 ? (
              filteredEmployee.map((employee, index) => (
                <tr key={employee._id} className={styles.tableRow}>
                  <td>
                    <input type="checkbox" className={styles.checkbox} />
                  </td>
                  <td>
                    <img
                      className={styles.profile}
                      src={profile}
                      alt="profile"
                    />
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.joining}</td>

                  <td>
                    <div ref={dropdownRef}>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleDropdownToggle(employee._id)}
                      >
                        <Dots />
                      </button>
                      {dropdownOpen === employee._id && (
                        <div className={styles.dropdown}>
                          <button
                            onClick={() => handleEdit(employee._id)}
                            className={styles.dropdownOption}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              console.log("clicked");
                              handleDelete(employee._id);
                            }}
                            className={styles.dropdownOption}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
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
    </div>
  );
}
