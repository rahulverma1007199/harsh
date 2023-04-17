import axios from "axios";
import { URL } from "./constants";

// Get all clients
export const getClients = async () => {
  const response = await axios.get(`${URL}/clientList`);
  const data = await response.data;
  return data.Data;
};

// Post Client
export const postClient = async (payload) => {
  const response = await axios.post(`${URL}/addClient`, payload);
  return response;
};
