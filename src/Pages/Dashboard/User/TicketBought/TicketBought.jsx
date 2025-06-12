import { useState, useEffect, useContext } from "react";
import { FaTicketAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from './../../../../Provider/AuthProvider';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const TicketBought = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await axiosSecure.get("/order");
        // Filter orders for current user and where paidStatus is true
        const userOrders = response.data.filter(
          (order) => order.order.email === user.email && order.paidStatus === true
        );
        setOrders(userOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load your tickets. Please try again later.",
        });
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email, axiosSecure]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Tickets
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            View all your purchased event tickets in one place
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="flex flex-col space-y-8">
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <FaTicketAlt />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{order.order.product}</div>
                            <div className="text-sm text-gray-500">{order.order.organizer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{formatDate(order.order.date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.order.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${order.order.price.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">
                          Unit: ${order.order.unitPrice.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="truncate max-w-xs">{order.transactionId}</div>
                        <div className="text-xs text-gray-400 flex items-center mt-1">
                          <FaClock className="mr-1" /> {order.paymentTime}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16 bg-white rounded-lg shadow"
          >
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-gray-900">No tickets found</h3>
            <p className="mt-1 text-gray-500">You haven't purchased any tickets yet.</p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => window.location.href = '/events'}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Events
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TicketBought;
