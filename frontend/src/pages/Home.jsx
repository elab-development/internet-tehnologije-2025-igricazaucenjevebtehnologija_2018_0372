import BugButton from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
        Master Javascript <br />by fixing it.
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mb-8">
        We give you the broken code. You find the bug. Prove you're a senior developer by squashing bugs in our gallery.
      </p>
      <BugButton onClick={() => navigate("/challenges")}>Start Hunting</BugButton>
    </div>
  );
}