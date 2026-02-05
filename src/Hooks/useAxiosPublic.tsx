import axios, { AxiosInstance } from "axios";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});

const useAxiosPublic = (): AxiosInstance => {
  return axiosPublic;
};

export default useAxiosPublic;
