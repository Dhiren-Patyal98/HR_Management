import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./addCandidate.module.css";
import { useAxiosInstance } from "../../../axiosInstance";
import { Cancel, Upload } from "../../../SVGIcon";

export default function AddCandidate({ closeDialog }) {
  const axiosInstance = useAxiosInstance();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
      experience: "",
      resume: null,
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string().required("Phone Number is required"),
      department: Yup.string().required("Department is required"),
      experience: Yup.string().required("Experience is required"),
      resume: Yup.mixed()
        .required("Resume is required")
        .test(
          "fileFormat",
          "Only PDF, DOC, or DOCX files are allowed",
          (value) =>
            value &&
            [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(value.type)
        ),
      termsAccepted: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("position", values.department);
        formData.append("experience", values.experience);
        formData.append("resume", values.resume);

        await axiosInstance.post("/candidate/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Candidate added successfully!");
        closeDialog();
      } catch (error) {
        console.error(error);
        alert("Error adding candidate. Please try again.");
      }
    },
  });

  return (
    <div className={styles.overlay}>
      <dialog className={styles.dialog}>
        <div className={styles.banner}>
          <span style={{ fontSize: "24px", fontWeight: "400" }}>
            Add New Candidate
          </span>
          <button onClick={closeDialog} className={styles.closeButton}>
            <Cancel />
          </button>
        </div>
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
                <span className={styles.errorText}>{formik.errors.email}</span>
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
                <span className={styles.errorText}>{formik.errors.phone}</span>
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
              <label htmlFor="resume" className={styles.customFileLabel}>
                {formik.values.resume ? formik.values.resume.name : "Resume"}
                <span>
                  <Upload />
                </span>
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={(event) => {
                  formik.setFieldValue("resume", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
                className={styles.hiddenFileInput}
              />
              {formik.touched.resume && formik.errors.resume ? (
                <span className={styles.errorText}>{formik.errors.resume}</span>
              ) : null}
            </div>
          </div>

          <div
            style={{
              marginLeft: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              name="termsAccepted"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.termsAccepted}
              className={styles.checkbox}
            />
            <span
              style={{
                color: "#A4A4A4",
                fontWeight: "300",
                fontSize: "16px",
                marginLeft: "1rem",
              }}
            >
              I hereby declare that the above information is true to the best of
              my knowledge and belief
            </span>
          </div>
          {formik.touched.termsAccepted && formik.errors.termsAccepted ? (
            <span className={styles.errorText}>
              {formik.errors.termsAccepted}
            </span>
          ) : null}
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
      </dialog>
    </div>
  );
}
