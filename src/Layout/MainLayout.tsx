import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";
import Footer from "../components/shared/Footer/Footer";
import useAuth from "../Hooks/useAuth";

const MainLayout = () => {
    const { darkMode } = useAuth() as any;
    return (
        <div className="relative font-roboto flex flex-col min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>

            {/* Main content area */}
            <main className={`flex-grow ${darkMode ? 'bg-dark-background' : 'bg-background'}`}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
