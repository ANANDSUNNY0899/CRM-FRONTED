
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://crm-backend-1-9x3q.onrender.com/api/users/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard"); 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthForm
      title="Login"
      handleSubmit={handleLogin}
      buttonText="Login"
      linkText="Don't have an account?"
      linkTo="/signup"
      formData={formData}
      setFormData={setFormData}
    />
  );
}
