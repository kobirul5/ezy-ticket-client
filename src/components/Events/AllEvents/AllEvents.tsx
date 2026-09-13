import { MdDateRange } from "react-icons/md";
import Loading from "../../shared/Loading/Loading";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useAuth from "@/Hooks/useAuth";
import { Link } from "react-router-dom";
import { useGetAllEventsQuery } from "@/app/features/event/eventApi";
import { useState } from "react";
import { FaBangladeshiTakaSign, FaRegClock, FaLocationDot, FaArrowRight } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";
import { motion } from "framer-motion";
import EventOffer from "../EventOffer";

const AllEvents = () => {
  const { darkMode } = useAuth() as any;
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12; // 3 rows × 4 cols = 12 cards

  const scrollToAllEvents = () => {
    const element = document.getElementById("allEvents");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { data: responseData, isLoading, error } = useGetAllEventsQuery({});

  const eventsArray = Array.isArray(responseData?.data) ? responseData.data : (responseData?.data?.data || []);
  const events = [...eventsArray].sort(
    (a: any, b: any) => new Date(b.dateTime || b.eventDate || 0).getTime() - new Date(a.dateTime || a.eventDate || 0).getTime()
  );

  if (error)
    return <p className="text-center text-red-500 font-semibold my-10">Error: {(error as Error).message}</p>;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  if (isLoading)
    return (
      <div className="text-center text-lg py-20">
        <Loading />
      </div>
    );

  const verifiedEvents = currentEvents.filter(
    (event: any) => event.status === "verified"
  );
  const displayedEvents = verifiedEvents.slice(0, 12); // Display 12 verified events

  return (
    <div
      className={`mb-8 md:mb-16 lg:mb-20 ${darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
        }`}
    >
      <EventOffer></EventOffer>

      {/* Events Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" id="allEvents">
        <div className="mb-8 mt-16 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-500 font-bold">Discover</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-main">All Events & Shows</h3>
          </div>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
            Page {currentPage} of {totalPages || 1}
          </span>
        </div>

        {/* Responsive Grid with Stagger Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          key={currentPage}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07 }
            }
          }}
        >
          {displayedEvents.map((event: any) => {
            const ticketsLeft = (event.totalTickets || 0) - (event.soldTickets || 0);
            return (
              <motion.div
                key={event.id || event._id}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
              >
                <Link to={`/eventdetailspublic/${event.id || event._id}`}>
                  <div
                    className={`${darkMode
                        ? "bg-dark-surface border-gray-800 text-white hover:border-emerald-500/50"
                        : "bg-white border-gray-100 text-gray-900 hover:border-emerald-400"
                      } rounded-2xl overflow-hidden border shadow-md hover:shadow-xl hover:shadow-emerald-500/10 transform hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col group relative`}
                  >
                    {/* Image Container with Badges */}
                    <div className="relative overflow-hidden h-52 sm:h-56">
                      <img
                        src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Dark gradient blend on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      {/* Top Left Category Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-emerald-300">
                          {event.category || "Event"}
                        </span>
                      </div>

                      {/* Top Right Price Tag */}
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-md shadow-md flex items-center gap-0.5">
                          <FaBangladeshiTakaSign className="text-[11px]" />
                          {event.price}
                        </span>
                      </div>

                      {/* Bottom Image Info: Location */}
                      {event.location && (
                        <div className="absolute bottom-2.5 left-3 text-xs text-gray-200 flex items-center gap-1 font-medium bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md max-w-[90%]">
                          <FaLocationDot className="text-emerald-400 text-xs flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        {/* Event Date & Duration */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <MdDateRange className="text-emerald-500 text-sm" />
                            <span>{event.eventDate || "Upcoming"}</span>
                          </div>
                          {event.duration && (
                            <div className="flex items-center gap-1.5">
                              <FaRegClock className="text-amber-500 text-xs" />
                              <span>{event.duration}</span>
                            </div>
                          )}
                        </div>

                        {/* Event Title */}
                        <h3 className="text-base sm:text-lg font-bold group-hover:text-emerald-500 transition-colors duration-200 line-clamp-2 mb-3">
                          {event.title}
                        </h3>
                      </div>

                      {/* Card Footer: Tickets Remaining & Action */}
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          <GiTicket className="text-emerald-500 text-base" />
                          <span className={ticketsLeft <= 10 ? "text-amber-500" : "text-gray-600 dark:text-gray-300"}>
                            {ticketsLeft > 0 ? `${ticketsLeft} Remaining` : "Sold Out"}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500 group-hover:translate-x-1 transition-transform duration-200">
                          Get Tickets <FaArrowRight className="text-[10px]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
              setTimeout(() => {
                scrollToAllEvents();
              }, 100);
            }}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${currentPage === 1
                ? "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                : "ezy-button-primary"
              }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
                setTimeout(() => {
                  scrollToAllEvents();
                }, 100);
              }}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${currentPage === index + 1
                  ? "bg-main text-white shadow-md shadow-emerald-600/30"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
              setTimeout(() => {
                scrollToAllEvents();
              }, 100);
            }}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${currentPage === totalPages || totalPages === 0
                ? "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                : "ezy-button-primary"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;

