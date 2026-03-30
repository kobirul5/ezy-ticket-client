import { FaShieldAlt, FaUsers, FaTicketAlt, FaChartBar } from "react-icons/fa";
import { useGetMyProfileQuery } from "@/app/features/user/userApi";
import ProfileCard from "./ProfileCard";

const AdminProfile = () => {
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
    { icon: <FaUsers className="text-indigo-500" />, label: "Total Users", value: "1.2K" },
    { icon: <FaTicketAlt className="text-emerald-500" />, label: "Tickets Sold", value: "8.4K" },
    { icon: <FaChartBar className="text-amber-500" />, label: "Revenue", value: "$54K" },
    { icon: <FaShieldAlt className="text-rose-500" />, label: "Role", value: "Admin" },
  ];

  return <ProfileCard userInfo={userInfo} refetch={refetch} stats={stats} />;
};

export default AdminProfile;