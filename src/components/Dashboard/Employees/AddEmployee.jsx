import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./addEmployee.module.css";
import { useAxiosInstance } from "../../../axiosInstance";
import { Calender, Cancel } from "../../../SVGIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddEmployee({ closeDialog, employeeData }) {
  const axiosInstance = useAxiosInstance();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: employeeData?.name || "",
      email: employeeData?.email || "",
      phone: employeeData?.phone || "",
      position: employeeData?.position || "",
      experience: employeeData?.experience || "",
      department: employeeData?.department || "",
      joining: employeeData?.joining || "",
      designation: employeeData?.designation || "",
      task: employeeData?.task || "",
      status: employeeData?.status || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string().required("Phone Number is required"),
      position: Yup.string().required("position is required"),
      experience: Yup.string().required("Experience is required"),
      department: Yup.string().required("Department is required"),
      joining: Yup.string().required("joining is required"),
      designation: Yup.string().required("designation is required"),
      task: Yup.string().required("task is required"),
      status: Yup.string().required("status is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (employeeData) {
          await axiosInstance.put(
            `/employee/update/${employeeData._id}`,
            values
          );
          alert("Employee updated successfully!");
        } else {
          await axiosInstance.post("/employee/add", values);
          alert("Employee added successfully!");
        }
        closeDialog();
      } catch (error) {
        console.error(error);
        alert("Error submitting data. Please try again.");
      }
    },
  });

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    formik.setFieldValue("joining", date.toLocaleDateString());
    setShowCalendar(false);
  };

  return (
    <div className={styles.overlay}>
      <dialog className={styles.dialog}>
        <div className={styles.banner}>
          <span style={{ fontSize: "24px", fontWeight: "400" }}>
            {employeeData ? "Edit Employee Details" : "Add New Employee"}
          </span>
          <button onClick={closeDialog} className={styles.closeButton}>
            <Cancel />
          </button>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className={styles.form}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.name && formik.errors.name ? (
                  <span className={styles.errorText}>{formik.errors.name}</span>
                ) : null}
              </div>
              <div className={styles.inputField}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className={styles.errorText}>
                    {formik.errors.email}
                  </span>
                ) : null}
              </div>
            </div>
            <div className={styles.form}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <span className={styles.errorText}>
                    {formik.errors.phone}
                  </span>
                ) : null}
              </div>
              <div className={styles.inputField}>
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.department}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.department && formik.errors.department ? (
                  <span className={styles.errorText}>
                    {formik.errors.department}
                  </span>
                ) : null}
              </div>
            </div>
            <div className={styles.form}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.position}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.position && formik.errors.position ? (
                  <span className={styles.errorText}>
                    {formik.errors.position}
                  </span>
                ) : null}
              </div>
              <div className={styles.inputField}>
                <div className={styles.dateInputWrapper}>
                  <input
                    type="text"
                    name="joining"
                    className={styles.dateInput}
                    placeholder="Date of Joining"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.joining}
                  />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleCalendarClick}
                  >
                    <Calender className={styles.dateIcon} />
                  </span>
                </div>

                {formik.touched.joining && formik.errors.joining ? (
                  <span className={styles.errorText}>
                    {formik.errors.joining}
                  </span>
                ) : null}
              </div>
            </div>

            {showCalendar && (
              <div className={styles.calendarPopup}>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelect}
                  dateFormat="yyyy-MM-dd"
                  inline
                />
              </div>
            )}
            <div className={styles.form}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.experience}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.experience && formik.errors.experience ? (
                  <span className={styles.errorText}>
                    {formik.errors.experience}
                  </span>
                ) : null}
              </div>
              <div className={styles.inputField}>
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.designation}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.designation && formik.errors.designation ? (
                  <span className={styles.errorText}>
                    {formik.errors.designation}
                  </span>
                ) : null}
              </div>
            </div>
            <div className={styles.form}>
              <div className={styles.inputField}>
                <input
                  type="text"
                  name="task"
                  placeholder="Assign Task"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.task}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.task && formik.errors.task ? (
                  <span className={styles.errorText}>{formik.errors.task}</span>
                ) : null}
              </div>
              <div className={styles.inputField}>
                <input
                  type="text"
                  name="status"
                  placeholder="Status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                  style={{
                    height: "32px",
                    borderRadius: "16px",
                    border: "1px solid #442487",
                  }}
                />
                {formik.touched.status && formik.errors.status ? (
                  <span className={styles.errorText}>
                    {formik.errors.status}
                  </span>
                ) : null}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                style={{
                  backgroundColor:
                    formik.isValid && formik.dirty ? "#442487" : "#A4A4A4",
                  height: "38px",
                  width: "212px",
                  borderRadius: "50px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  border: "none",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
