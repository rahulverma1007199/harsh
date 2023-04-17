import axios from "axios";
import { URL } from "./constants";
// GET ALL CUSTOMERS
export const getCustomer = async () => {
  const response = await axios.get(`${URL}/customerList`);
  const customerData = await response.data;
  // console.log("FETCHED-CUSTOMER-DATA", customerData.Message);
  return customerData.Message;
};

// DELETE CUSTOMER
export const deleteCustomer = async (customerId) => {
  const response = await axios.put(`${URL}/deleteCustomer/${customerId}`);
  const data = await response.data;
  console.log("CUSTOMER_DELETED", data);
  return data;
};
