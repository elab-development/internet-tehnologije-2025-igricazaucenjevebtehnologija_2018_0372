import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchChallangeById, submit } from "../api";

export default function Solve() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState({});
    const [userCode, setUserCode] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });

    const loadChallenge = async () => {
        const data = await fetchChallangeById(id);
        setChallenge(data);
        setUserCode(data.buggyCode)
    }

    useEffect(() => {
        loadChallenge();
    }, []);

    const handleSubmit = async () => {
        try{
            const res = await submit(id, userCode);
            if (res.isCorrect){
                alert(res.message);
            }else{
                alert(res.message);
            }
        }
        catch(err){
            alert(err.message);
        }
    }

    return (
        <div className="min-h-screen  p-6 font-mono text-slate-300">
            <div className="max-w-5xl mx-auto border border-slate-800 bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-slate-800 px-6 py-3 border-b border-slate-700 flex justify-between items-center">
                    <span className="text-white font-bold">{">"} SESSION: {challenge.title}</span>
                    <span className="text-xs text-indigo-400">DIFF_LEVEL: {challenge.difficulty}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Instructions Sidebar */}
                    <div className="p-6 border-r border-slate-800">
                        <h2 className="text-indigo-400 text-xs font-bold uppercase mb-4 tracking-widest">Problem_Description</h2>
                        <p className="text-sm leading-relaxed mb-6 italic">"{challenge.description}"</p>
                        <div className="text-[10px] text-slate-500 bg-black/30 p-3 rounded border border-slate-800">
                            [DEBUG_LOG]: Fix the logic and execute the patch to synchronize the database.
                        </div>
                    </div>

                    {/* Code Editor Area */}
                    <div className="lg:col-span-2 p-6 flex flex-col gap-4">
                        <textarea
                            className="w-full h-80 bg-black border border-slate-700 p-4 text-green-500 font-mono text-sm rounded outline-none focus:border-indigo-500 transition-colors"
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            spellCheck="false"
                        />

                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded transition-all shadow-lg shadow-indigo-600/20"
                            >
                                EXECUTE_PATCH
                            </button>

                            {message.text && (
                                <span className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                    {message.text}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
