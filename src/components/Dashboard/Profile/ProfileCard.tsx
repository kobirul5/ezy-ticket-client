import { MdOutlineEmail, MdEdit, MdVerified } from "react-icons/md";
import { FaHome, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";
import noImage from "@/assets/Common_image/noImage.png";
import EditButton from "./EditButton";

interface ProfileCardProps {
  userInfo: any;
  user?: any;
  refetch: () => void;
  stats?: { icon: React.ReactNode; label: string; value: string | number }[];
}

const roleBadgeMap: Record<string, { label: string; color: string }> = {
  ADMIN: { label: "Admin", color: "bg-rose-100 text-rose-600" },
  SUPER_ADMIN: { label: "Super Admin", color: "bg-red-100 text-red-700" },
  EVENT_MANAGER: { label: "Event Manager", color: "bg-violet-100 text-violet-600" },
  TRAVEL_MANAGER: { label: "Travel Manager", color: "bg-cyan-100 text-cyan-600" },
  USER: { label: "User", color: "bg-emerald-100 text-emerald-600" },
};

const ProfileCard = ({ userInfo, user, refetch, stats }: ProfileCardProps) => {
  const badge = roleBadgeMap[userInfo?.role] ?? { label: userInfo?.role ?? "Member", color: "bg-gray-100 text-gray-600" };
  const avatar = userInfo?.picture || userInfo?.photoURL || user?.photoURL || noImage;
  const displayName = userInfo?.name || user?.displayName || "Anonymous User";

  const infoItems = [
    {
      icon: <MdOutlineEmail className="text-xl text-indigo-500" />,
      bg: "bg-indigo-50",
      label: "Email Address",
      value: userInfo?.email || user?.email || "Not provided",
    },
    {
      icon: <FaPhoneAlt className="text-lg text-emerald-500" />,
      bg: "bg-emerald-50",
      label: "Phone Number",
      value: userInfo?.phone || "Not provided",
    },
    {
      icon: <FaHome className="text-xl text-amber-500" />,
      bg: "bg-amber-50",
      label: "Address",
      value: userInfo?.address || "Not provided",
    },
    {
      icon: <FaShieldAlt className="text-lg text-rose-400" />,
      bg: "bg-rose-50",
      label: "Account Status",
      value: userInfo?.status || "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Hero Card ── */}
        <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
          {/* Banner */}
          <div className="relative h-52 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
            {/* Decorative circles */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 right-10 w-36 h-36 bg-white/10 rounded-full" />
            <div className="absolute top-6 right-24 w-20 h-20 bg-white/10 rounded-full" />
          </div>

          {/* Avatar + Name */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={avatar}
                  alt={displayName}
                  className="w-32 h-32 rounded-2xl object-cover shadow-xl ring-4 ring-white"
                />
                <span className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 shadow">
                  <MdVerified className="text-white text-sm" />
                </span>
              </div>

              {/* Name + badge */}
              <div className="text-center sm:text-left pb-1 flex-1">
                <h1 className="text-3xl  font-extrabold text-gray-800 leading-tight">
                  {displayName}
                </h1>
                <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge.color}`}>
                    {badge.label}
                  </span>
                  {userInfo?.isVerified && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-500">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <div className="sm:pb-1">
                <EditButton user={userInfo} refetch={refetch} />
              </div>
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-2xl py-5 gap-2 cursor-default"
                  >
                    <div className="text-2xl">{s.icon}</div>
                    <p className="text-xl font-bold text-gray-800">{s.value}</p>
                    <p className="text-xs text-gray-400 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Info Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${item.bg} p-3 rounded-xl flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;
