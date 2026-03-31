import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import noImage from "@/assets/Common_image/noImage.png";
import {
  useGetMyEventsQuery,
  useDeleteEventMutation,
} from "@/app/features/event/eventApi";
import { useGetMyProfileQuery } from "@/app/features/user/userApi";

const MyAddedEvents = () => {
  const { data: profileData } = useGetMyProfileQuery(undefined);
  const user = profileData?.data;
  const {
    data: res,
    isLoading,
    isError,
    refetch,
  } = useGetMyEventsQuery(user?.email, {
    skip: !user?.email,
  });
  const myEvents = res?.data || [];
  const [deleteEvent] = useDeleteEventMutation();

  const handleDeleteEvent = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteEvent(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your event has been deleted.",
            icon: "success",
          });
        } catch (err: any) {
          Swal.fire(
            "Error",
            err?.data?.message || "Failed to delete event",
            "error",
          );
        }
      }
    });
  };

  if (isLoading) return <div className="text-center my-8">Loading...</div>;
  if (isError)
    return (
      <div className="text-center my-8 text-red-500">Error loading events</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-8">
        <MdEventAvailable className="text-4xl text-main" />
        <h2 className="text-3xl md:text-5xl font-semibold text-center">
          My Added Events
        </h2>
      </div>

      {myEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">
            You haven"t added any events yet
          </p>
          <Link to="/dashboard/addEvent" className="btn btn-primary">
            Add Your First Event
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Tickets</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myEvents.map((event: any) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td>
                    <img
                      src={event.image || noImage}
                      className="w-20 h-16 rounded"
                      alt="event"
                    />
                  </td>
                  <td>{event.title}</td>
                  <td>{event.eventType}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>
                    <div>
                      <div>Total: {event.totalTickets}</div>
                      <div>Sold: {event.soldTickets}</div>
                      <div>Price: ${event.price}</div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-outline ${event.status === "verified" ? "badge-success" : event.status === "rejected" ? "badge-error" : "badge-warning"}`}
                    >
                      {event.status || "pending"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center justify-center">
                      <Link
                        to={`/dashboard/updateEvent/${event.id}`}
                        state={{ event }}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAddedEvents;
