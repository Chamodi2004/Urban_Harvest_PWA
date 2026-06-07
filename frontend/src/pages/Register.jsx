import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sanitizedEmail = email.toLowerCase().trim();
      const sanitizedName = name.trim();
      const res = await api.post("/api/auth/register", { name: sanitizedName, email: sanitizedEmail, password });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      alert("Registration Successful");
      navigate("/");
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
            autoComplete="name"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            autoCapitalize="none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
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