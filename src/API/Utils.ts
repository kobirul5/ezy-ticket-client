import axios from "axios";

interface User {
  email?: string;
  displayName?: string;
}

export const saveUserInformation = async (user: User) => {
  if (user?.email) {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/${user.email}`, {
      name: user.displayName,
      email: user.email,
      status: "",
      phone: "",
      address: "",
      role: "user",
    });
  }
};
