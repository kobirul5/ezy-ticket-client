import { Link, Outlet } from "react-router-dom";
import { useGetMyProfileQuery } from "../app/features/user/userApi";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Loading from "@/components/shared/Loading/Loading";
import { FaTicketAlt } from "react-icons/fa";
import { HiMenuAlt2, HiX } from "react-icons/hi";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading } = useGetMyProfileQuery(undefined);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50/50 overflow-hidden font-sans text-slate-800 antialiased">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white border-b border-slate-200/80 shadow-xs z-30">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <FaTicketAlt className="text-sm" />
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">
            Ezy<span className="text-emerald-600">Tickets</span>
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <HiX className="w-6 h-6 text-slate-700" />
          ) : (
            <HiMenuAlt2 className="w-6 h-6 text-slate-700" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMenu={closeMenu} />

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Body */}
      <main className="flex-1 h-full overflow-y-auto">
        <div className="min-h-full p-4 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
