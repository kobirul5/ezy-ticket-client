import { FaCalendarAlt, FaTicketAlt, FaStar } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import ProfileCard from "./ProfileCard";

const EventManagerProfile = () => {
  const { userInfo, user, refetchUserInfo } = useAuth()! as any;

  const stats = [
    { icon: <FaCalendarAlt className="text-violet-500" />, label: "Events Created", value: 24 },
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Sold", value: 380 },
    { icon: <FaStar className="text-amber-400" />, label: "Avg. Rating", value: "4.8" },
  ];

  return <ProfileCard userInfo={userInfo} user={user} refetch={refetchUserInfo} stats={stats} />;
};

export default EventManagerProfile;