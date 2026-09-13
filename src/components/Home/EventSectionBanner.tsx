import tanoura from "@/assets/Home_image/tanoura.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { FaFire, FaArrowRight } from "react-icons/fa6";

const EventSectionBanner = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div
      style={{
        backgroundImage: `url(${tanoura})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
      className="relative min-h-[60vh] md:min-h-[75vh] w-full flex items-end pb-12 md:pb-20 mb-8 md:mb-16 lg:mb-20 overflow-hidden"
    >
      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Content Container */}
      <motion.div 
        ref={ref}
        className="relative z-10 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-11/12 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8">
          <div className="max-w-3xl">
            <motion.div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-morphism border border-white/20 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FaFire className="text-amber-400 text-xs sm:text-sm animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-300">
                Trending Concerts & Shows
              </span>
            </motion.div>

            <motion.h1 
              className="uppercase text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create Memories <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
                That Last Forever
              </span>
            </motion.h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/events">
              <button
                className="px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5 cursor-pointer text-base"
              >
                Browse Events <FaArrowRight className="text-sm" />
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventSectionBanner;