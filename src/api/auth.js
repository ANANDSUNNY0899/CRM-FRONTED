import axios from "axios";

const API = "http://localhost:5000"; 

export const loginUser = async (email, password) => {
  return axios.post(`${API}/login`, { email, password });
};

export const signupUser = async (email, password) => {
  return axios.post(`${API}/signup`, { email, password });
};
