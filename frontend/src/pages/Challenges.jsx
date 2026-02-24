import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { fetchChallenges } from "../api";
//challenge
export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadChallenges = async () => {
    setLoading(true);
    const data = await fetchChallenges();

    setChallenges(data);
  }
  useEffect(() => {
   loadChallenges();
   setLoading(false);
  }, []);

  if (loading) return <div className="p-8 text-indigo-500 font-mono animate-pulse">{">"} ACCESSING_DATABASE...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-black mb-8 underline decoration-indigo-500">Bug Gallery</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map(c => <Card key={c.id} challenge={c} />)}
      </div>
      {/* <Link
        to={`/solve/${challenge.id}`}
        className="block w-full text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded transition-colors uppercase"
      >
        Initialize_Patch
      </Link> */}
    </div>
  )
};

