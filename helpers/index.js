import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants/api-data";

export const getToken = () => AsyncStorage.getItem("token").then(t => t?.replace(/"/g, ""));

export const getUserData = async () => {
  const token = await getToken();
  if (!token) return null;

  try {
    const res = await axios.get(`${BASE_URL}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
};
