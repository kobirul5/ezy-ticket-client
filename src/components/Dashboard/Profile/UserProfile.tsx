import { MdOutlineEmail, MdEdit } from "react-icons/md";
import noImage from "@/assets/Common_image/noImage.png";
import { FaHome, FaPhoneAlt, FaTicketAlt, FaUserCircle } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

import useAuth from "@/Hooks/useAuth";
import { useEffect } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";  // Import SweetAlert
import EditButton from "./EditButton";
// import { motion } from "framer-motion";  // Import motion for animations

const UserProfile = () => {
  const { userInfo, user, refetchUserInfo } = useAuth()! as any;
  // const [orders, setOrders] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) {
        // setLoading(false); // Commented out as loading state is commented out
        return;
      }
      
      try {
        // const response = await axiosSecure.get("/order");
        // // Filter orders for current user and where paidStatus is true
        // const userOrders = response.data.filter(
        //   (order: any) => order.order.email === user.email && order.paidStatus === true
        // );
        // setOrders(userOrders); // Commented out as orders state is commented out
        // setLoading(false); // Commented out as loading state is commented out
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load your tickets. Please try again later.",
        });
        // setLoading(false); // Commented out as loading state is commented out
      }
    };

    fetchOrders();
  }, [user?.email, axiosSecure]);

  // const formatDate = (dateString: string) => {
  //   const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };

  return (
    <div className="min-h-screen mt-5 mb-10">
      <div className="w-10/12 mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-main to-green-500 h-46 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={userInfo?.photoURL || user?.photoURL || noImage}
                alt="User"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-6 sm:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {userInfo?.name || "Anonymous User"}
            </h1>

            <div className="flex justify-center gap-2  md:gap-4 lg:gap-8 mt-6 mb-8">
              <div className="bg-green-50 rounded-lg p-4 text-center w-32">
                <FaTicketAlt className="text-main text-2xl mx-auto mb-2" />
                <p className="font-semibold text-gray-700">12</p>
                <p className="text-xs text-gray-500">Tickets</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center w-32">
                <FaFolderOpen className="text-blue-500 text-2xl mx-auto mb-2" />
                <p className="font-semibold text-gray-700">5</p>
                <p className="text-xs text-gray-500">Events</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center w-32">
                <FaUserCircle className="text-purple-500 text-2xl mx-auto mb-2" />
                <p className="font-semibold text-gray-700">Member</p>
                <p className="text-xs text-gray-500">Since 2023</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* User Details */}
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <MdOutlineEmail className="text-main text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">
                    {userInfo?.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaPhoneAlt className="text-blue-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">
                    {userInfo?.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaHome className="text-purple-500 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-800">
                    {userInfo?.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <EditButton user={userInfo} refetch={refetchUserInfo}></EditButton>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
        
         
       
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
