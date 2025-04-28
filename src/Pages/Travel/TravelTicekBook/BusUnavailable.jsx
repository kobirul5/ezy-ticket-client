import { FaBus } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";

const BusUnavailable = () => {
    const {darkMode}= useAuth()

  return (
    <div className={` ${darkMode ? "bg-[#1d1d1d] text-white" : "bg-white "} mx-auto my-8 p-8 w-full shadow-xl border border-white/20 backdrop-blur-lg ` }>
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-green-100 rounded-full animate-pulse">
          <MdErrorOutline className="text-5xl text-green-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold ">
          Bus Not Available
          <span className="block mt-2 text-xl ">Currently no buses in service</span>
        </h1>
      </div>

      {/* Message Section */}
      <div className="space-y-4 mb-8">
        <p className="text-lg  text-center">
          Sorry, there are currently no buses available at this station.
          <span className="block mt-2 text-green-600 font-medium">Please check back later</span>
        </p>
      </div>

      
      {/* Bus Icon Decor */}
      <div className="mt-8 text-center opacity-75">
        <FaBus className="text-4xl text-green-400 mx-auto animate-float" />
      </div>
    </div>
  );
};

export default BusUnavailable;