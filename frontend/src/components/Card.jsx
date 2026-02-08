import { Link } from "react-router-dom";

export default function ChallengeCard({ challenge }) {
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-indigo-900">{challenge.title}</h3>
        <span className="text-xs font-bold uppercase px-2 py-1 bg-amber-100 text-amber-700 rounded">
          {challenge.difficulty}
        </span>
      </div>
      <p className="text-slate-600 text-sm mb-4">{challenge.description}</p>
      <div className="bg-slate-900 rounded-lg p-3 mb-4">
        <code className="text-green-400 text-xs font-mono">{challenge.buggyCode}</code>
      </div>
      <Link to={`/challenges/${challenge.id}`} className="text-indigo-600 font-semibold text-sm hover:underline">
        Fix this bug →
      </Link>
    </div>
  );
}