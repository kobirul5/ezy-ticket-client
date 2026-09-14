import React from "react";
import { Link } from "react-router-dom";
import { 
  FaBus, 
  FaTicketAlt, 
  FaRoute, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaShieldAlt, 
  FaBolt, 
  FaCheckCircle 
} from "react-icons/fa";
import { MdEventSeat, MdQrCodeScanner } from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi";
import useAuth from "@/Hooks/useAuth";

const TravelEventServices: React.FC = () => {
  const { darkMode } = useAuth()! as any;

  const travelFeatures = [
    { icon: <FaBus className="text-emerald-500" />, title: "Bus Ticket Booking", desc: "Reserve seats across major bus operators hassle-free." },
    { icon: <FaRoute className="text-emerald-500" />, title: "Intercity Routes", desc: "Extensive nationwide network connecting major cities." },
    { icon: <MdEventSeat className="text-emerald-500" />, title: "Interactive Seat Map", desc: "Pick your preferred seat with real-time availability." },
  ];

  const eventFeatures = [
    { icon: <FaTicketAlt className="text-purple-500" />, title: "Concerts & Festivals", desc: "Passes for top music shows, expos, & cultural events." },
    { icon: <FaCalendarAlt className="text-purple-500" />, title: "Sports & Competitions", desc: "Book passes for tournaments & live stadium matches." },
    { icon: <MdQrCodeScanner className="text-purple-500" />, title: "Instant QR Entry", desc: "Fast & digital e-ticket verification at venue gates." },
  ];

  return (
    <section className="mt-20 container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-main/10 text-main text-xs md:text-sm font-bold uppercase tracking-wider mb-4">
          <HiOutlineSparkles className="text-base" />
          <span>Our Services</span>
        </div>
        <h2 className={`text-3xl md:text-5xl font-black mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}>
          Travel & Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-emerald-400">Ticketing Solutions</span>
        </h2>
        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          We bring travel transportation and entertainment events together under one seamless digital platform. Whether traveling across cities or booking concert tickets, we have you covered!
        </p>
      </div>

      {/* Grid Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Travel Service Card */}
        <div className={`relative rounded-3xl p-6 md:p-10 border transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${
          darkMode 
            ? "bg-slate-900/80 border-slate-800 shadow-xl shadow-emerald-950/20 hover:border-main/50" 
            : "bg-white border-slate-100 shadow-xl shadow-slate-200/60 hover:border-main/40"
        }`}>
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 text-3xl">
                <FaBus />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide">
                Transportation
              </span>
            </div>

            <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Travel & Transit Booking
            </h3>
            
            <p className={`text-sm md:text-base mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Plan your journeys with confidence. We offer real-time schedule checks, transparent seat selection, and instant confirmation for intercity buses and travel routes.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-8">
              {travelFeatures.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-base">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm md:text-base font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Link */}
          <Link
            to="/travel"
            className="inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-main text-white font-semibold text-sm md:text-base shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:opacity-95 transition-all"
          >
            <span>Book Travel Tickets</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Event Service Card */}
        <div className={`relative rounded-3xl p-6 md:p-10 border transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${
          darkMode 
            ? "bg-slate-900/80 border-slate-800 shadow-xl shadow-purple-950/20 hover:border-purple-500/50" 
            : "bg-white border-slate-100 shadow-xl shadow-slate-200/60 hover:border-purple-500/40"
        }`}>
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 text-3xl">
                <FaTicketAlt />
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wide">
                Entertainment & Events
              </span>
            </div>

            <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}>
              Event Ticketing & Experiences
            </h3>
            
            <p className={`text-sm md:text-base mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Never miss out on your favorite concerts, sports tournaments, and festivals. Discover live events, reserve digital tickets, and get fast QR gate access.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-8">
              {eventFeatures.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-xl bg-purple-500/10 text-purple-500 text-base">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm md:text-base font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Link */}
          <Link
            to="/events"
            className="inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm md:text-base shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:opacity-95 transition-all"
          >
            <span>Explore Upcoming Events</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>

      {/* Service Highlights Strip */}
      <div className={`mt-10 p-6 rounded-2xl border grid grid-cols-1 md:grid-cols-3 gap-6 text-center ${
        darkMode ? "bg-slate-900/50 border-slate-800 text-gray-300" : "bg-emerald-50/60 border-emerald-100/80 text-gray-700"
      }`}>
        <div className="flex items-center justify-center gap-3">
          <FaShieldAlt className="text-emerald-500 text-xl" />
          <span className="text-sm font-semibold">100% Verified & Secure Bookings</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <FaBolt className="text-amber-500 text-xl" />
          <span className="text-sm font-semibold">Instant E-Ticket Delivery</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <FaCheckCircle className="text-blue-500 text-xl" />
          <span className="text-sm font-semibold">Unified Platform for Travel & Events</span>
        </div>
      </div>
    </section>
  );
};

export default TravelEventServices;
