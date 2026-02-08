import AdminProfile from "@/components/Dashboard/Profile/AdminProfile";
import EventManagerProfile from "@/components/Dashboard/Profile/EventManagerProfile";
import TravelManagerProfile from "@/components/Dashboard/Profile/TravelManagerProfile";
import UserProfile from "@/components/Dashboard/Profile/UserProfile";
import Loading from "@/components/shared/Loading/Loading";
import { useGetMyProfileQuery } from "@/app/features/user/userApi";

const Profile = () => {
  const { data: profileData, isLoading } = useGetMyProfileQuery(undefined);
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
