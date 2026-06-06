import { useState } from "react";
import axios from "axios";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", { name, email, password });

      alert("Registration Successful");
    } catch (error) {
      const msg = error?.response?.data?.message || "Registration Failed";
      alert(msg);
    }
  };

  return (
    <div className="container center-page">
      <div className="card" style={{ maxWidth: "420px", width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Create your account</h2>
        <p className="muted" style={{ textAlign: "center", marginBottom: "16px" }}>Join workshops and stay updated on local events.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="primary-btn" style={{ width: "100%", marginTop: "12px" }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;