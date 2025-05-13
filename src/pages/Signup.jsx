
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://crm-backend-1-9x3q.onrender.com/api/users", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard"); 
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthForm
      title="Create Account"
      handleSubmit={handleSignup}
      buttonText="Sign Up"
      linkText="Already have an account?"
      linkTo="/"
      formData={formData}
      setFormData={setFormData}
    />
  );
}
