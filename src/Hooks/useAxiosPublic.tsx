import axios, { AxiosInstance } from "axios";
import { BASE_API_URL } from "../config/api.config";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true
});

const useAxiosPublic = (): AxiosInstance => {
  return axiosPublic;
};

export default useAxiosPublic;
