import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-white border-b border-slate-200">
      <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter">
        BUGHUNT🐞
      </Link>
      <div className="space-x-6 font-medium">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <Link to="/challenges" className="hover:text-indigo-600">Challenges</Link>
        {user ? (
          <button onClick={logout} className="text-rose-500">Logout</button>
        ) : (
          <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Login</Link>
        )}
      </div>
    </nav>
  );
}