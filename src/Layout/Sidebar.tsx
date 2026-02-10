import { FaBus, FaHome, FaList, FaUsers, FaWallet, FaMapMarkerAlt } from "react-icons/fa";
import { TbHomePlus } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { HiCurrencyDollar } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import { MdEmojiEvents } from "react-icons/md";

interface SidebarProps {
    isMobileMenuOpen: boolean;
    closeMenu: () => void;
}

const Sidebar = ({ isMobileMenuOpen, closeMenu }: SidebarProps) => {
    const { role } = useUserRole();
    const { user, userInfo } = useAuth() as any;

    const isAdmin = role === "ADMIN";
    const isEventManager = role === "EVENT_MANAGER";
    const isTravelManager = role === "TRAVEL_MANAGER";

    // Active link style function
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        isActive ? "bg-main text-white" : "hover:bg-main";

    return (
        <div className={`
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0
            fixed md:relative
            w-64
            bg-background border-r border-gray-200
            h-full
            z-40
            transition-transform duration-300 ease-in-out
            overflow-y-auto
        `}>
            <div className="p-4">
                {/* Desktop Logo */}
                <Link to={"/"} className="hidden md:block">
                    <div className="flex items-center justify-center gap-1 pt-4">
                        <p className="text-3xl text-main font-bold">Ezy Tickets</p>
                    </div>
                </Link>

                {/* User Role Badge */}
                <div className="mt-4 md:mt-0">
                    {isAdmin ? (
                        <h2 className="dashboard-badge bg-green-200 text-green-800">ADMIN</h2>
                    ) : isTravelManager ? (
                        <h2 className="dashboard-badge bg-purple-200 text-purple-800">TRAVEL MANAGER</h2>
                    ) : isEventManager ? (
                        <h2 className="dashboard-badge bg-teal-200 text-teal-800">EVENT MANAGER</h2>
                    ) : (
                        <h2 className="dashboard-badge bg-red-200 text-red-800">USER</h2>
                    )}
                </div>

                <div className="divider"></div>
                
                {/* ----------------User Profile---------------- */}
                <div className="flex flex-col items-center space-y-2 mb-4 text-center">
                    <h3 className="text-2xl font-bold">{userInfo?.name}</h3>
                    <p className="font-semibold text-gray-500">{user?.email}</p>
                </div>
                
                <div className="divider"></div>
                
                {/* Quick Action Button for privileged roles */}
                {(isAdmin || isTravelManager) && (
                    <div className="px-4 mb-4">
                        <Link 
                            to="/dashboard/add-bus-service" 
                            onClick={closeMenu}
                            className="flex items-center justify-center gap-2 bg-main hover:bg-green-600 text-white w-full py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
                        >
                            <TbHomePlus className="text-xl" /> Add New Bus
                        </Link>
                    </div>
                )}
                
                {/* Navigation Menu */}
                <ul className="menu space-y-2 w-full">
                    {isAdmin ? (
                        <>
                            <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> Admin Profile</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/manageEvents" className={getNavLinkClass}><MdEmojiEvents /> Manage Events</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/MyBusServices" className={getNavLinkClass}><FaBus /> Manage Travel</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/add-bus-service" className={getNavLinkClass}><TbHomePlus /> Add New Bus</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/manageUsers" className={getNavLinkClass}><FaUsers /> Manage Users</NavLink></li>
                        </>
                    ) : isEventManager ? (
                        <>
                            <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> My Profile</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/addEvent" className={getNavLinkClass}><TbHomePlus /> Add Post</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/myAddedEvents" className={getNavLinkClass}><FaList /> My added Post</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/ticketSold" className={getNavLinkClass}><HiCurrencyDollar /> Ticket Sold</NavLink></li>
                        </>
                    ) : isTravelManager ? (
                        <>
                            <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> My Profile</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/MyBusServices" className={getNavLinkClass}><FaBus /> My Buses</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/add-bus-service" className={getNavLinkClass}><TbHomePlus /> Add New Bus</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/create-travel-location" className={getNavLinkClass}><FaMapMarkerAlt /> Location</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/soldTickets" className={getNavLinkClass}><HiCurrencyDollar /> Ticket Sold</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li onClick={closeMenu}><NavLink to="/dashboard/profile" className={getNavLinkClass}><IoPerson /> My Profile</NavLink></li>

                            <li onClick={closeMenu}><NavLink to="/dashboard/ticket-bought" className={getNavLinkClass}><FaWallet /> Ticket Bought</NavLink></li>
                        </>
                    )}

                    <div className="divider"></div>
                    <li><NavLink to="/" className={getNavLinkClass}><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/contact" className={getNavLinkClass}><IoMdMail /> Support</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
