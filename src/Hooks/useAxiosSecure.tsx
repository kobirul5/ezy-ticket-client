import axios, { AxiosInstance } from "axios";
import { BASE_API_URL } from "../config/api.config";

const axiosSecure: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true
});

const useAxiosSecure = (): AxiosInstance => {
  return axiosSecure;
};

export default useAxiosSecure;
