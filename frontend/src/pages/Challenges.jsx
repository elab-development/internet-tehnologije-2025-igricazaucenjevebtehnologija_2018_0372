import { useState, useEffect } from "react";
import Card from "../components/Card";
import { fetchChallenges, fetchSolvedChallengeIds } from "../api";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  const loadChallenges = async () => {
    setLoading(true);
    const allChallenges = await fetchChallenges();
    const solved = await fetchSolvedChallengeIds();

    setChallenges(allChallenges);
    setSolvedChallenges(solved);
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
        {challenges.map(c => <Card key={c.id} challenge={c} isSolved={solvedChallenges.includes(c.id)}/>)}
      </div>
    </div>
  )
};

