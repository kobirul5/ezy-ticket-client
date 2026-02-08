import axios, { AxiosInstance } from "axios";

const axiosSecure: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

const useAxiosSecure = (): AxiosInstance => {
  return axiosSecure;
};

export default useAxiosSecure;
