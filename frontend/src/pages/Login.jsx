import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", {
        email: email.toLowerCase().trim(),
        password,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      const msg = error?.response?.data?.message || "Login Failed";
      alert(msg);
    }
  };

  return (
    <div className="container center-page">
      <div className="card" style={{ maxWidth: "420px", width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        <form onSubmit={handleSubmit}>
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
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="primary-btn"
            style={{ width: "100%", marginTop: "12px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;