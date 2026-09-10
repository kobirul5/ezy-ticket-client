import { ReactNode } from "react";
import {
  FaBus,
  FaCalendarAlt,
  FaChartBar,
  FaFolderOpen,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaStar,
  FaTicketAlt,
  FaUserCircle,
  FaUsers,
  FaPhoneAlt,
  FaHome,
  FaUserCheck,
} from "react-icons/fa";
import { MdOutlineEmail, MdVerified, MdOutlineSecurity } from "react-icons/md";
import noImage from "@/assets/Common_image/noImage.png";
import EditButton from "@/components/Dashboard/Profile/EditButton";
import Loading from "@/components/shared/Loading/Loading";
import { useGetMyProfileQuery } from "@/app/features/user/userApi";
import useAuth from "@/Hooks/useAuth";

const roleBadgeMap: Record<
  string,
  { label: string; color: string; banner: string }
> = {
  ADMIN: {
    label: "Admin",
    color: "bg-rose-100 text-rose-700 border border-rose-200",
    banner: "from-rose-500 via-pink-600 to-purple-700",
  },
  SUPER_ADMIN: {
    label: "Super Admin",
    color: "bg-red-100 text-red-800 border border-red-200",
    banner: "from-red-600 via-rose-600 to-indigo-800",
  },
  EVENT_MANAGER: {
    label: "Event Manager",
    color: "bg-violet-100 text-violet-700 border border-violet-200",
    banner: "from-violet-600 via-purple-600 to-indigo-700",
  },
  TRAVEL_MANAGER: {
    label: "Travel Manager",
    color: "bg-cyan-100 text-cyan-700 border border-cyan-200",
    banner: "from-cyan-600 via-teal-600 to-emerald-700",
  },
  USER: {
    label: "User",
    color: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    banner: "from-emerald-500 via-teal-600 to-cyan-600",
  },
};

const getRoleStats = (role?: string) => {
  switch (role) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return [
        {
          icon: <FaUsers className="text-indigo-500 text-xl" />,
          label: "Total Users",
          value: "1.2K",
          bg: "bg-indigo-50",
        },
        {
          icon: <FaTicketAlt className="text-emerald-500 text-xl" />,
          label: "Tickets Sold",
          value: "8.4K",
          bg: "bg-emerald-50",
        },
        {
          icon: <FaChartBar className="text-amber-500 text-xl" />,
          label: "Revenue",
          value: "$54K",
          bg: "bg-amber-50",
        },
        {
          icon: <FaShieldAlt className="text-rose-500 text-xl" />,
          label: "Access Level",
          value: "Full Admin",
          bg: "bg-rose-50",
        },
      ];
    case "EVENT_MANAGER":
      return [
        {
          icon: <FaCalendarAlt className="text-violet-500 text-xl" />,
          label: "Events Created",
          value: 24,
          bg: "bg-violet-50",
        },
        {
          icon: <FaTicketAlt className="text-emerald-500 text-xl" />,
          label: "Tickets Sold",
          value: 380,
          bg: "bg-emerald-50",
        },
        {
          icon: <FaStar className="text-amber-400 text-xl" />,
          label: "Avg. Rating",
          value: "4.8",
          bg: "bg-amber-50",
        },
        {
          icon: <FaUserCheck className="text-blue-500 text-xl" />,
          label: "Attendees",
          value: "1.5K",
          bg: "bg-blue-50",
        },
      ];
    case "TRAVEL_MANAGER":
      return [
        {
          icon: <FaBus className="text-cyan-500 text-xl" />,
          label: "Bus Services",
          value: 8,
          bg: "bg-cyan-50",
        },
        {
          icon: <FaMapMarkerAlt className="text-rose-400 text-xl" />,
          label: "Destinations",
          value: 15,
          bg: "bg-rose-50",
        },
        {
          icon: <FaTicketAlt className="text-emerald-500 text-xl" />,
          label: "Tickets Sold",
          value: 210,
          bg: "bg-emerald-50",
        },
        {
          icon: <FaChartBar className="text-indigo-500 text-xl" />,
          label: "Monthly Growth",
          value: "+18%",
          bg: "bg-indigo-50",
        },
      ];
    case "USER":
    default:
      return [
        {
          icon: <FaTicketAlt className="text-emerald-500 text-xl" />,
          label: "Tickets Bought",
          value: 12,
          bg: "bg-emerald-50",
        },
        {
          icon: <FaFolderOpen className="text-violet-500 text-xl" />,
          label: "Events Joined",
          value: 5,
          bg: "bg-violet-50",
        },
        {
          icon: <FaUserCircle className="text-cyan-500 text-xl" />,
          label: "Member Status",
          value: "Active",
          bg: "bg-cyan-50",
        },
      ];
  }
};

const Profile = () => {
  const { user } = useAuth()! as any;
  const { data: profileData, isLoading, refetch } = useGetMyProfileQuery(undefined);
  const userInfo = profileData?.data;

  if (isLoading) {
    return <Loading />;
  }

  const roleKey = userInfo?.role || "USER";
  const badge = roleBadgeMap[roleKey] || roleBadgeMap["USER"];
  const stats = getRoleStats(roleKey);
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
      icon: <MdOutlineSecurity className="text-lg text-rose-500" />,
      bg: "bg-rose-50",
      label: "Account Status",
      value: userInfo?.status || "ACTIVE",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero Banner Card */}
        <div className="rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100">
          {/* Banner Gradient */}
          <div className={`relative h-48 sm:h-56 bg-gradient-to-r ${badge.banner} overflow-hidden`}>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 right-12 w-48 h-48 bg-white/10 rounded-full blur-xl" />
          </div>

          {/* User Profile Header Details */}
          <div className="px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 sm:-mt-20">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={avatar}
                  alt={displayName}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-2xl ring-4 ring-white bg-white"
                />
                <span className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1.5 shadow-md">
                  <MdVerified className="text-white text-base" />
                </span>
              </div>

              {/* Name & Role Badge */}
              <div className="text-center sm:text-left mt-4 sm:mt-0 flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight leading-tight truncate">
                  {displayName}
                </h1>
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start mt-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${badge.color}`}>
                    {badge.label}
                  </span>
                  {userInfo?.isVerified && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      ✓ Verified Account
                    </span>
                  )}
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    ID: #{userInfo?.id || "N/A"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="sm:pb-1 mt-4 sm:mt-0">
                <EditButton user={userInfo} refetch={refetch} />
              </div>
            </div>

            {/* Dynamic Role Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center bg-gray-50/80 hover:bg-gray-100/80 transition-all rounded-2xl p-4 gap-1.5 border border-gray-100 shadow-sm hover:shadow"
                  >
                    <div className={`${s.bg} p-2.5 rounded-xl mb-1`}>{s.icon}</div>
                    <p className="text-xl font-extrabold text-gray-800">{s.value}</p>
                    <p className="text-xs text-gray-400 font-medium text-center">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detailed Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`${item.bg} p-3.5 rounded-2xl flex-shrink-0 shadow-inner`}>
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                <p className="text-sm sm:text-base font-bold text-gray-800 truncate">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
