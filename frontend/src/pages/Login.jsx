import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BugButton from "../components/Button";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const fakeUser = { username, role: "hunter" };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
    navigate("/challenges");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-3xl font-bold mb-6 italic">Welcome Back!</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          required
          className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Password"
        />
        <BugButton className="w-full">Sign In</BugButton>
      </form>
    </div>
  );
}