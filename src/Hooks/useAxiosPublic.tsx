import axios, { AxiosInstance } from "axios";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});

const useAxiosPublic = (): AxiosInstance => {
  return axiosPublic;
};

export default useAxiosPublic;
