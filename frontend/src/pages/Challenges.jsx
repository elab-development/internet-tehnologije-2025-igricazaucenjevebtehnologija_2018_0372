import { useEffect, useState } from "react";
import ChallengeCard from "../components/Card";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Simulating a backend call
    const mockData = [
      { id: 1, title: "The Loop Trap", difficulty: "Easy", description: "This loop never ends. Can you see why?", buggyCode: "for (let i = 0; i >= 0; i++) { ... }" },
      { id: 2, title: "Null Pointer", difficulty: "Medium", description: "Accessing a property on an undefined object.", buggyCode: "const name = user.profile.name;" },
      { id: 3, title: "Ghost Equality", difficulty: "Hard", description: "Type coercion is causing issues.", buggyCode: "if (price == true) { ... }" }
    ];
    setChallenges(mockData);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-black mb-8 underline decoration-indigo-500">Bug Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map(c => <ChallengeCard key={c.id} challenge={c} />)}
      </div>
    </div>
  );
}