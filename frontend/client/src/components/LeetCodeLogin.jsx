// frontend/src/components/LeetCodeLogin.jsx
import { useState } from "react";
import axios from "axios";

export default function LeetCodeLogin({ onConnected }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const connectAccount = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // get JWT from storage
      const res = await axios.post(
        "/api/leetcode/login",
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${token}`, // attach token
          },
        }
      );

      alert(res.data.message || "Connected to LeetCode!");
      if (onConnected) onConnected();
    } catch (err) {
      alert(
        "Failed to connect: " +
          (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", background: "#fff", borderRadius: "8px" }}>
      <h3>🔗 Connect LeetCode Account</h3>
      <input
        placeholder="LeetCode Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
      />
      <input
        placeholder="LeetCode Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
      />
      <button
        onClick={connectAccount}
        disabled={loading}
        style={{
          background: "#28a745",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Connecting..." : "Connect"}
      </button>
    </div>
  );
}
