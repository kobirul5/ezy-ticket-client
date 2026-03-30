import React from "react";

interface Credential {
  role: string;
  email: string;
  password: string;
  color: string;
  hoverColor: string;
  icon: string;
}

interface QuickLoginButtonsProps {
  darkMode: boolean;
  onSelect: (email: string, password: string) => void;
}

const roleCredentials: Credential[] = [
  {
    role: "User",
    email: "user@ezyticket.com",
    password: "User@123",
    color: "from-emerald-500 to-green-600",
    hoverColor: "hover:from-emerald-600 hover:to-green-700",
    icon: "👤",
  },
  {
    role: "Admin",
    email: "admin@ezyticket.com",
    password: "Admin@123",
    color: "from-rose-500 to-pink-600",
    hoverColor: "hover:from-rose-600 hover:to-pink-700",
    icon: "👑",
  },
  {
    role: "Event",
    email: "eventmanager@ezyticket.com",
    password: "Event@123",
    color: "from-violet-500 to-purple-600",
    hoverColor: "hover:from-violet-600 hover:to-purple-700",
    icon: "🎭",
  },
  {
    role: "Travel",
    email: "travelmanager@ezyticket.com",
    password: "Travel@123",
    color: "from-cyan-500 to-teal-600",
    hoverColor: "hover:from-cyan-600 hover:to-teal-700",
    icon: "✈️",
  },
  
];

const QuickLoginButtons: React.FC<QuickLoginButtonsProps> = ({
  darkMode,
  onSelect,
}) => {
  return (
    <div className="mb-5">
      <p
        className={`text-xs font-semibold uppercase tracking-widest mb-2 text-center ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        ⚡ Quick Login
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        {roleCredentials.map((cred) => (
          <button
            key={cred.role}
            type="button"
            onClick={() => onSelect(cred.email, cred.password)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold bg-gradient-to-r ${cred.color} ${cred.hoverColor} hover:scale-95 transition-all duration-200 shadow-md`}
          >
            <span>{cred.icon}</span>
            <span>{cred.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLoginButtons;
