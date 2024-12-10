import React, { useState, useEffect } from "react";
import styles from "./candidate.module.css";
import { CiSearch } from "react-icons/ci";
import AddCandidate from "./AddCandidate";
import { Delete, Download } from "../../../SVGIcon";
import { useAxiosInstance } from "../../../axiosInstance";

export default function Candidates() {
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [candidates, setCandidates] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axiosInstance.get("/candidate/candidates");
        setCandidates(response.data.candidates);
      } catch (error) {
        console.error("Error fetching candidates", error);
      }
    };

    fetchCandidates();
  }, [axiosInstance]);

  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      await axiosInstance.put(`/candidate/update-status/${candidateId}`, {
        status: newStatus,
      });

      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate._id === candidateId
            ? { ...candidate, status: newStatus }
            : candidate
        )
      );

      alert("Status updated successfully");
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (candidateId) => {
    try {
      await axiosInstance.delete(`/candidate/delete/${candidateId}`);
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate._id !== candidateId)
      );
      alert("Candidate deleted successfully");
    } catch (error) {
      console.error("Error deleting candidate", error);
      alert("Failed to delete candidate");
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedOption === "All" || candidate.status === selectedOption;
    const matchesPosition =
      selectedPosition === "All" || candidate.position === selectedPosition;
    return matchesSearch && matchesStatus && matchesPosition;
  });

  return (
    <div>
      <div className={styles.topContainer}>
        <div className={styles.filters}>
          <div>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className={styles.dropdown}
            >
              <option value="All">All</option>
              <option value="New">New</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

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
              Add New Candidate
            </button>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <AddCandidate closeDialog={() => setIsDialogOpen(false)} />
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th></th>
              <th>Sr no.</th>
              <th>Candidate Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Resume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <tr key={candidate._id} className={styles.tableRow}>
                  <td>
                    <input type="checkbox" className={styles.checkbox} />
                  </td>
                  <td>{index + 1}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.position}</td>
                  <td>
                    <select
                      className={styles.selectStatus}
                      value={candidate.status}
                      onChange={(e) =>
                        handleStatusChange(candidate._id, e.target.value)
                      }
                    >
                      <option value="New">New</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td>{candidate.experience}</td>
                  <td>
                    <a
                      href={`http://localhost:5000/api/candidate/${candidate.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resumeLink}
                      download
                    >
                      <Download />
                    </a>
                  </td>
                  <td>
                    <button
                      className={styles.actionButton}
                      onClick={() => handleDelete(candidate._id)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className={styles.emptyRow}>
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
