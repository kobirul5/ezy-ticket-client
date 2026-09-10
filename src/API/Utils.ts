import axios from "axios";
import { BASE_API_URL } from "../config/api.config";

interface User {
  email?: string;
  displayName?: string;
}

export const saveUserInformation = async (user: User) => {
  if (user?.email) {
    await axios.post(`${BASE_API_URL}/user/${user.email}`, {
      name: user.displayName,
      email: user.email,
      status: "",
      phone: "",
      address: "",
      role: "user",
    });
  }
};
