import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import Button from "../components/Button";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser(email, password);


      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));


      setUser(data.user);


      navigate("/challenges");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      {error && <p className="text-rose-500 mb-4 font-medium">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          required
          className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
      <p className="mt-8 text-center text-slate-500 text-sm">
        Dont have an account?{" "}
        <Link to="/register" className="text-indigo-400 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}