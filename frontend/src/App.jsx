import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Challenges from "./pages/Challenges";

export default function App() {
  const [user, setUser]= useState("");

return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route 
          path="/challenges" 
          element={user ? <Challenges /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
}
