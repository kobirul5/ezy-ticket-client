import { Link, Outlet } from "react-router-dom";
import useUserRole from "../Hooks/useUserRole";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isLoading } = useUserRole();

    const closeMenu = ()=>{
        setIsMobileMenuOpen(false)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row h-screen overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden flex justify-between items-center p-4 bg-background border-b border-gray-200">
                <Link to={"/"}>
                    <p className="text-2xl text-main font-bold">Ezy Tickets</p>
                </Link>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-700 focus:outline-none"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar Component */}
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMenu={closeMenu} />

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 h-full overflow-y-auto">
                <div >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
