import AdminProfile from "@/components/Dashboard/Profile/AdminProfile";
import EventManagerProfile from "@/components/Dashboard/Profile/EventManagerProfile";
import TravelManagerProfile from "@/components/Dashboard/Profile/TravelManagerProfile";
import UserProfile from "@/components/Dashboard/Profile/UserProfile";
import Loading from "@/components/shared/Loading/Loading";
import ProfileCard from "@/components/Dashboard/Profile/ProfileCard";
import { useGetMyProfileQuery } from "@/app/features/user/userApi";
import useAuth from "@/Hooks/useAuth";
import { ReactNode } from "react";
import { FaBus, FaCalendarAlt, FaChartBar, FaFolderOpen, FaMapMarkerAlt, FaShieldAlt, FaStar, FaTicketAlt, FaUserCircle, FaUsers } from "react-icons/fa";

type Stat = { icon: ReactNode; label: string; value: string | number };

const statsByRole: Record<string, Stat[]> = {
  ADMIN: [
    { icon: <FaUsers className="text-indigo-500" />, label: "Total Users", value: "1.2K" },
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Sold", value: "8.4K" },
    { icon: <FaChartBar className="text-amber-500" />, label: "Revenue", value: "$54K" },
    { icon: <FaShieldAlt className="text-rose-500" />, label: "Role", value: "Admin" },
  ],
  SUPER_ADMIN: [
    { icon: <FaUsers className="text-indigo-500" />, label: "Total Users", value: "1.2K" },
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Sold", value: "8.4K" },
    { icon: <FaChartBar className="text-amber-500" />, label: "Revenue", value: "$54K" },
    { icon: <FaShieldAlt className="text-rose-500" />, label: "Role", value: "Super Admin" },
  ],
  EVENT_MANAGER: [
    { icon: <FaCalendarAlt className="text-violet-500" />, label: "Events Created", value: 24 },
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Sold", value: 380 },
    { icon: <FaStar className="text-amber-400" />, label: "Avg. Rating", value: "4.8" },
  ],
  TRAVEL_MANAGER: [
    { icon: <FaBus className="text-cyan-500" />, label: "Bus Services", value: 8 },
    { icon: <FaMapMarkerAlt className="text-rose-400" />, label: "Destinations", value: 15 },
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Sold", value: 210 },
  ],
  USER: [
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Bought", value: 12 },
    { icon: <FaFolderOpen className="text-violet-500" />, label: "Events Joined", value: 5 },
    { icon: <FaUserCircle className="text-cyan-500" />, label: "Member Since", value: "2023" },
  ],
};

const Profile = () => {
  const { user } = useAuth()! as any;
  const { data: profileData, isLoading, refetch } = useGetMyProfileQuery(undefined);
  const userInfo = profileData?.data;

  // console.log("Profile Page - Role:", userInfo?.role);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN" ? (
        <AdminProfile />
      ) : userInfo?.role === "TRAVEL_MANAGER" ? (
        <TravelManagerProfile />
      ) : userInfo?.role === "EVENT_MANAGER" ? (
        <EventManagerProfile />
      ) : (
        <UserProfile />
      )}
    </div>
  );
};

export default Profile;
