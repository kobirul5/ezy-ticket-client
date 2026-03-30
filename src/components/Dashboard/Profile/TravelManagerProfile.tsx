import { FaBus, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import ProfileCard from "./ProfileCard";

const TravelManagerProfile = () => {
  const { userInfo, user, refetchUserInfo } = useAuth()! as any;

  const stats = [
    { icon: <FaBus className="text-cyan-500" />, label: "Bus Services", value: 8 },
    { icon: <FaMapMarkerAlt className="text-rose-400" />, label: "Destinations", value: 15 },
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Sold", value: 210 },
  ];

  return <ProfileCard userInfo={userInfo} user={user} refetch={refetchUserInfo} stats={stats} />;
};

export default TravelManagerProfile;