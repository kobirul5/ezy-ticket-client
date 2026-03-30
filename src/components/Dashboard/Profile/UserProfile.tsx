import { FaTicketAlt, FaUserCircle } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import useAuth from "@/Hooks/useAuth";
import { useGetMyProfileQuery } from "@/app/features/user/userApi";
import ProfileCard from "./ProfileCard";

const UserProfile = () => {
  const { user } = useAuth()! as any;
  const { data: profileData, isLoading, refetch } = useGetMyProfileQuery(undefined);
  const userInfo = profileData?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-main" />
      </div>
    );
  }

  const stats = [
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Bought", value: 12 },
    { icon: <FaFolderOpen className="text-violet-500" />, label: "Events Joined", value: 5 },
    { icon: <FaUserCircle className="text-cyan-500" />, label: "Member Since", value: "2023" },
  ];

  return <ProfileCard userInfo={userInfo} user={user} refetch={refetch} stats={stats} />;
};

export default UserProfile;
