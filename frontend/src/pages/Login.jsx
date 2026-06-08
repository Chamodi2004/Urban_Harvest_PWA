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
      if (!error.response) {
        // Backend is down / network error
        const sanitizedEmail = email.toLowerCase().trim();
        const offlineUsers = JSON.parse(localStorage.getItem("offline_users") || "[]");
        const defaultUser = { email: "test@test.com", password: "password", name: "Test User" };
        const allUsers = [defaultUser, ...offlineUsers];

        const user = allUsers.find((u) => u.email === sanitizedEmail);

        if (user) {
          if (user.password === password) {
            localStorage.setItem("token", `mock-token-${sanitizedEmail}`);
            alert("Login Successful");
            navigate("/");
            return;
          } else {
            alert("Invalid password ");
            return;
          }
        } else {
          alert("User not found . Please register first or use test@test.com / password.");
          return;
        }
      }

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