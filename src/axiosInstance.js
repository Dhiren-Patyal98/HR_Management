import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useAxiosInstance() {
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_URL;

  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
