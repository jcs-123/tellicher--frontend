import React, { useState } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import bgImage from "../../assets/bg.jpg";
import logo from "../../assets/L1.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // Store user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 800,
        onClose: () => navigate("/admin/dashboard"),
      });
    } catch (err) {
      toast.error("Invalid username or password", {
        position: "top-center",
        autoClose: 800,
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", color: "white", marginBottom: "20px" }}
      >
        <img src={logo} alt="Archdiocese Logo" style={{ width: "250px", height: "120px" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card style={{
          width: "340px",
          padding: "25px 20px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.95)"
        }}>

          <h6 className="text-center mb-3 text-muted">Curia Software</h6>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="username">
              <InputGroup>
                <InputGroup.Text><i className="bi bi-person-fill"></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <InputGroup>
                <InputGroup.Text><i className="bi bi-lock-fill"></i></InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">Sign In</Button>
            </div>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
