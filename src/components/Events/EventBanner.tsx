import React from "react";
import eventBanner from "@/assets/Events_image/show.webp";
import { motion } from "framer-motion";
import { FaArrowDownLong, FaFire, FaTicketSimple, FaShieldHalved, FaWandMagicSparkles, FaCalendarCheck } from "react-icons/fa6";
import { MdCelebration, MdOutlineConfirmationNumber } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";

interface EventBannerProps {
    scrollToSection: (sectionId: string) => void;
}

const EventBanner: React.FC<EventBannerProps> = ({ scrollToSection }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <div className="relative w-full overflow-hidden mb-8 md:mb-16 lg:mb-20">
            {/* Hero Container */}
            <div
                className="relative min-h-[480px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[680px] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-700"
                style={{
                    backgroundImage: `url(${eventBanner})`,
                }}
            >
                {/* Layer 1: Ambient Backdrop Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/85" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                {/* Decorative Ambient Glowing Orbs */}
                <div className="absolute top-1/4 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-500/20 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-10 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/15 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

                {/* Hero Content Grid - Container layout */}
                <motion.div
                    className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 flex flex-col justify-between min-h-[440px] sm:min-h-[500px] md:min-h-[580px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Top Pill / Status Tag */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full glass-morphism border border-white/20 shadow-xl backdrop-blur-md">
                            <span className="relative flex h-2.5 sm:h-3 w-2.5 sm:w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 sm:h-3 w-2.5 sm:w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase text-emerald-300 flex items-center gap-1.5">
                                <FaFire className="text-amber-400 animate-bounce text-xs sm:text-sm" /> Hot Live Events & Shows
                            </span>
                        </motion.div>

                        {/* Quick Stat Pill */}
                        <motion.div variants={itemVariants} className="flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs font-medium text-gray-300">
                            <FaCalendarCheck className="text-emerald-400 text-xs sm:text-sm" /> 50+ Upcoming Shows This Month
                        </motion.div>
                    </div>

                    {/* Center Main Text Content */}
                    <div className="my-auto pt-6 sm:pt-8 pb-4 sm:pb-6">
                        <motion.p
                            variants={itemVariants}
                            className="text-amber-400 font-semibold tracking-widest uppercase text-xs sm:text-sm md:text-lg mb-2 sm:mb-3 flex items-center gap-2"
                        >
                            <IoSparkles className="text-amber-300" /> Limited Tickets Available
                        </motion.p>

                        <motion.h1
                            variants={itemVariants}
                            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.15]"
                        >
                            Make Moments <br />
                            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                                Become Memories
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-3 sm:mt-4 max-w-2xl text-gray-300 text-xs sm:text-base md:text-lg font-normal leading-relaxed"
                        >
                            Discover concerts, cultural festivals, sports tournaments, and stage performances. Reserve your seats seamlessly with EzyTicket instant e-tickets.
                        </motion.p>

                        {/* CTA Action Buttons */}
                        <motion.div variants={itemVariants} className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => scrollToSection("topEvents")}
                                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer text-xs sm:text-sm md:text-base w-full sm:w-auto"
                            >
                                <MdCelebration className="text-lg sm:text-xl" /> Explore Featured Shows
                            </button>

                            <button
                                onClick={() => scrollToSection("allEvents")}
                                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 shadow-md backdrop-blur-md transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm md:text-base w-full sm:w-auto"
                            >
                                <MdOutlineConfirmationNumber className="text-lg sm:text-xl text-amber-400" /> Browse All Events
                            </button>
                        </motion.div>
                    </div>

                    {/* Bottom Bar: Feature Highlights + Scroll Indicator */}
                    <motion.div
                        variants={itemVariants}
                        className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
                    >
                        {/* Feature Pills */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 w-full md:w-auto">
                            <div className="flex items-center gap-2.5 text-gray-300 p-2 sm:p-0 rounded-lg bg-white/5 sm:bg-transparent border sm:border-0 border-white/10">
                                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                                    <FaTicketSimple className="text-xs sm:text-sm md:text-base" />
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-semibold text-white">Instant E-Ticket</h4>
                                    <p className="text-[10px] sm:text-xs text-gray-400">QR Entry Pass</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 text-gray-300 p-2 sm:p-0 rounded-lg bg-white/5 sm:bg-transparent border sm:border-0 border-white/10">
                                <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400">
                                    <FaWandMagicSparkles className="text-xs sm:text-sm md:text-base" />
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-semibold text-white">Verified Venues</h4>
                                    <p className="text-[10px] sm:text-xs text-gray-400">100% Guaranteed</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 text-gray-300 p-2 sm:p-0 rounded-lg bg-white/5 sm:bg-transparent border sm:border-0 border-white/10">
                                <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400">
                                    <FaShieldHalved className="text-xs sm:text-sm md:text-base" />
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-semibold text-white">Secure Payment</h4>
                                    <p className="text-[10px] sm:text-xs text-gray-400">SSL Encrypted</p>
                                </div>
                            </div>
                        </div>

                        {/* Scroll Down Button */}
                        <div
                            className="flex items-center gap-2.5 text-gray-300 hover:text-white cursor-pointer group transition-colors self-center md:self-auto"
                            onClick={() => scrollToSection("topEvents")}
                        >
                            <span className="uppercase text-xs sm:text-sm font-semibold tracking-wider">Scroll down</span>
                            <motion.div
                                animate={{
                                    y: [0, 6, 0],
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="p-2 rounded-full bg-white/10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300"
                            >
                                <FaArrowDownLong className="text-xs sm:text-sm" />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default EventBanner;

