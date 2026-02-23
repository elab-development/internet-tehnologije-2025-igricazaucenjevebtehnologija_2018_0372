import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Registration failed");

            // Auto-login after registration
            localStorage.setItem("token", data.token);
            navigate("/challenges");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
            <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <Button type="submit" className="w-full">Register</Button>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-xs text-center">
                    {error}
                </div>
            )}

            <p className="mt-8 text-center text-slate-500 text-sm">
                Have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
}