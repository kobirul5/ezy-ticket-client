import {
  FaBus,
  FaHome,
  FaList,
  FaUsers,
  FaWallet,
  FaMapMarkerAlt,
  FaTicketAlt,
} from "react-icons/fa";
import { TbHomePlus } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { HiCurrencyDollar } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { MdEmojiEvents, MdLogout } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useGetMyProfileQuery } from "../app/features/user/userApi";
import noImage from "@/assets/Common_image/noImage.png";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  closeMenu: () => void;
}

const roleBadgeMap: Record<string, { label: string; bg: string }> = {
  ADMIN: { label: "Admin", bg: "bg-rose-50 text-rose-600 border-rose-100" },
  SUPER_ADMIN: { label: "Super Admin", bg: "bg-red-50 text-red-600 border-red-100" },
  EVENT_MANAGER: { label: "Event Manager", bg: "bg-purple-50 text-purple-600 border-purple-100" },
  TRAVEL_MANAGER: { label: "Travel Manager", bg: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  USER: { label: "User", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
};

const Sidebar = ({ isMobileMenuOpen, closeMenu }: SidebarProps) => {
  const { logOut } = useAuth() as any;
  const navigate = useNavigate();

  const { data: profileData } = useGetMyProfileQuery(undefined);
  const userInfo = profileData?.data;
  const role = userInfo?.role || "USER";

  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const isEventManager = role === "EVENT_MANAGER";
  const isTravelManager = role === "TRAVEL_MANAGER";

  const badge = roleBadgeMap[role] || roleBadgeMap["USER"];

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-emerald-600 text-white shadow-sm font-semibold"
        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
    }`;

  const handleLogout = async () => {
    closeMenu();
    const result = await Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Log out",
      customClass: {
        popup: "rounded-2xl",
      },
    });

    if (result.isConfirmed) {
      try {
        await logOut();
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          showConfirmButton: false,
          timer: 1200,
          customClass: {
            popup: "rounded-2xl",
          },
        });
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <aside
      className={`
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
        fixed md:relative
        w-64
        bg-white border-r border-slate-200/70
        h-full
        z-40
        transition-transform duration-200 ease-out
        flex flex-col justify-between
      `}
    >
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-none">
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-2.5 px-2" onClick={closeMenu}>
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <FaTicketAlt className="text-base" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            Ezy<span className="text-emerald-600">Tickets</span>
          </span>
        </Link>

        {/* User Card */}
        <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center gap-3">
          <img
            src={userInfo?.picture || noImage}
            alt="Avatar"
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {userInfo?.name || "User"}
            </p>
            <span
              className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badge.bg}`}
            >
              {badge.label}
            </span>
          </div>
        </div>

        {/* Main Menu */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Dashboard
          </p>

          <nav className="space-y-1">
            {isAdmin ? (
              <>
                <NavLink to="/dashboard/profile" onClick={closeMenu} className={getNavLinkClass}>
                  <IoPerson className="text-base opacity-75" /> Profile
                </NavLink>
                <NavLink to="/dashboard/manageEvents" onClick={closeMenu} className={getNavLinkClass}>
                  <MdEmojiEvents className="text-base opacity-75" /> Manage Events
                </NavLink>
                <NavLink to="/dashboard/MyBusServices" onClick={closeMenu} className={getNavLinkClass}>
                  <FaBus className="text-base opacity-75" /> Manage Travel
                </NavLink>
                <NavLink to="/dashboard/add-bus-service" onClick={closeMenu} className={getNavLinkClass}>
                  <TbHomePlus className="text-base opacity-75" /> Add New Bus
                </NavLink>
                <NavLink to="/dashboard/manageUsers" onClick={closeMenu} className={getNavLinkClass}>
                  <FaUsers className="text-base opacity-75" /> Manage Users
                </NavLink>
              </>
            ) : isEventManager ? (
              <>
                <NavLink to="/dashboard/profile" onClick={closeMenu} className={getNavLinkClass}>
                  <IoPerson className="text-base opacity-75" /> Profile
                </NavLink>
                <NavLink to="/dashboard/addEvent" onClick={closeMenu} className={getNavLinkClass}>
                  <TbHomePlus className="text-base opacity-75" /> Add Post
                </NavLink>
                <NavLink to="/dashboard/my-added-events" onClick={closeMenu} className={getNavLinkClass}>
                  <FaList className="text-base opacity-75" /> My Added Posts
                </NavLink>
                <NavLink to="/dashboard/ticketSold" onClick={closeMenu} className={getNavLinkClass}>
                  <HiCurrencyDollar className="text-base opacity-75" /> Ticket Sold
                </NavLink>
              </>
            ) : isTravelManager ? (
              <>
                <NavLink to="/dashboard/profile" onClick={closeMenu} className={getNavLinkClass}>
                  <IoPerson className="text-base opacity-75" /> Profile
                </NavLink>
                <NavLink to="/dashboard/MyBusServices" onClick={closeMenu} className={getNavLinkClass}>
                  <FaBus className="text-base opacity-75" /> My Buses
                </NavLink>
                <NavLink to="/dashboard/add-bus-service" onClick={closeMenu} className={getNavLinkClass}>
                  <TbHomePlus className="text-base opacity-75" /> Add New Bus
                </NavLink>
                <NavLink to="/dashboard/create-travel-location" onClick={closeMenu} className={getNavLinkClass}>
                  <FaMapMarkerAlt className="text-base opacity-75" /> Location
                </NavLink>
                <NavLink to="/dashboard/soldTickets" onClick={closeMenu} className={getNavLinkClass}>
                  <HiCurrencyDollar className="text-base opacity-75" /> Ticket Sold
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard/profile" onClick={closeMenu} className={getNavLinkClass}>
                  <IoPerson className="text-base opacity-75" /> Profile
                </NavLink>
                <NavLink to="/dashboard/ticket-bought" onClick={closeMenu} className={getNavLinkClass}>
                  <FaWallet className="text-base opacity-75" /> Ticket Bought
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* Quick Links */}
        <div className="space-y-1 pt-2 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            General
          </p>
          <nav className="space-y-1">
            <NavLink to="/" onClick={closeMenu} className={getNavLinkClass}>
              <FaHome className="text-base opacity-75" /> Home Page
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={getNavLinkClass}>
              <IoMdMail className="text-base opacity-75" /> Support
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Logout Footer */}
      <div className="p-3.5 border-t border-slate-100 bg-white">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors duration-150"
        >
          <MdLogout className="text-base opacity-80" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
