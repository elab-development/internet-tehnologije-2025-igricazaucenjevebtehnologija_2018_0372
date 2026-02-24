import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Challenges from "./pages/Challenges";
import Solve from "./pages/Solve";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const {user, loading} = useAuth();

return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/challenges" 
          element={user ? <Challenges /> : <Navigate to="/login" />} 
        />
        <Route path="challenges/:id" element={<Solve/>}/>
      </Routes>
    </div>
  );
}
