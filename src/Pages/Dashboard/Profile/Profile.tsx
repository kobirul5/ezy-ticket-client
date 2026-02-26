import AdminProfile from "@/components/Dashboard/Profile/AdminProfile";
import UserProfile from "@/components/Dashboard/Profile/UserProfile";
import Loading from "@/components/shared/Loading/Loading";
import { useGetMyProfileQuery } from "@/app/features/user/userApi";

const Profile = () => {
  const { data: profileData, isLoading } = useGetMyProfileQuery(undefined);
  const userInfo = profileData?.data;

  if (isLoading) {
    return <Loading />;
  }

  const isAuthorizedAdmin = userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN";

  return (
    <div>
      {isAuthorizedAdmin ? (
        <AdminProfile />
      ) : (
        <UserProfile />
      )}
    </div>
  );
};

export default Profile;
