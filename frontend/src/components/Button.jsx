export default function BugButton({ children, onClick, variant = "primary" }) {
  const styles = variant === "primary" 
    ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
    : "bg-rose-500 hover:bg-rose-600 text-white";

  return (
    <button 
      onClick={onClick} 
      className={`${styles} px-6 py-2 rounded-lg font-medium transition-all shadow-md active:scale-95`}
    >
      {children}
    </button>
  );
}