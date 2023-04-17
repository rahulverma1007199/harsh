import axios from "axios";
import { URL } from "./constants";
// GET DASHBOARD DATA
export const dashboardData = async () => {
  try {
    const response = await axios.get(`${URL}/dashboard`);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
