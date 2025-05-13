import axios from "axios";

const API = "https://crm-backend-1-9x3q.onrender.com/"; 

export const loginUser = async (email, password) => {
  return axios.post(`${API}/login`, { email, password });
};

export const signupUser = async (email, password) => {
  return axios.post(`${API}/signup`, { email, password });
};
