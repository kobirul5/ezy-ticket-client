import React from "react";
import {
  FaCalendarDays,
  FaLaptopCode,
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaGuitar,
  FaArrowRight,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import useAuth from "@/Hooks/useAuth";
import Heading from "../shared/Heading";

const EventInfo = () => {
  const { darkMode } = useAuth() as any;

  const events = [
    {
      title: "Venue Events",
      category: "In-Person Gatherings",
      description:
        "We organize in-person events that connect attendees, offering a memorable and engaging experience.",
      icon: <FaCalendarDays className="text-3xl text-amber-400" />,
      tag: "Live Experience",
      accentColor: "from-amber-500/30 to-orange-600/40",
      borderColor: "group-hover:border-amber-500/50",
      backgroundImage:
        "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Online Webinars",
      category: "Virtual & Interactive",
      description:
        "Host seamless virtual events with interactive features for a fully immersive experience.",
      icon: <FaLaptopCode className="text-3xl text-cyan-400" />,
      tag: "100% Online",
      accentColor: "from-cyan-500/30 to-blue-600/40",
      borderColor: "group-hover:border-cyan-500/50",
      backgroundImage:
        "https://images.pexels.com/photos/3727459/pexels-photo-3727459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Networking Events",
      category: "B2B & Social",
      description:
        "Bring together professionals for valuable networking opportunities and idea sharing.",
      icon: <FaUsers className="text-3xl text-purple-400" />,
      tag: "Connect & Grow",
      accentColor: "from-purple-500/30 to-indigo-600/40",
      borderColor: "group-hover:border-purple-500/50",
      backgroundImage:
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Workshops",
      category: "Skill Development",
      description:
        "Create educational workshops that engage your audience and help them develop new skills.",
      icon: <FaLightbulb className="text-3xl text-emerald-400" />,
      tag: "Hands-On",
      accentColor: "from-emerald-500/30 to-teal-600/40",
      borderColor: "group-hover:border-emerald-500/50",
      backgroundImage:
        "https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Conferences",
      category: "Corporate & Summits",
      description:
        "Organize large-scale conferences with a variety of speakers, workshops, and networking sessions.",
      icon: <FaHandshake className="text-3xl text-rose-400" />,
      tag: "Keynote Speakers",
      accentColor: "from-rose-500/30 to-red-600/40",
      borderColor: "group-hover:border-rose-500/50",
      backgroundImage:
        "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Concerts",
      category: "Music & Festivals",
      description:
        "Organize large-scale concerts with a variety of bands, solo artists, and music festivals.",
      icon: <FaGuitar className="text-3xl text-pink-400" />,
      tag: "Live Music",
      accentColor: "from-pink-500/30 to-fuchsia-600/40",
      borderColor: "group-hover:border-pink-500/50",
      backgroundImage:
        "https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 md:mb-20 lg:mb-24 ${darkMode ? "text-dark-primary" : "text-black"}`}>
      <Heading
        subtitle={"Explore Your Options"}
        title={"From Concerts to Conferences"}
      />

      <motion.div
        className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className={`group relative rounded-2xl overflow-hidden shadow-xl border border-white/10 ${event.borderColor} transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[300px] sm:min-h-[340px] text-white`}
          >
            {/* Background Image with Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
              style={{
                backgroundImage: `url(${event.backgroundImage})`,
              }}
            />

            {/* Dark & Colored Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/30 group-hover:from-black/90 transition-all duration-500" />
            <div className={`absolute inset-0 bg-gradient-to-br ${event.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Top Bar: Icon & Category Tag */}
            <div className="relative z-10 p-6 flex items-start justify-between">
              <div className="p-3.5 rounded-2xl glass-morphism border border-white/20 shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {event.icon}
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 border border-white/20 backdrop-blur-md text-gray-200">
                <FaWandMagicSparkles className="text-amber-300 text-[10px]" /> {event.tag}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 pt-0 text-left mt-auto">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1 block">
                {event.category}
              </span>
              <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300 flex items-center justify-between">
                {event.title}
                <FaArrowRight className="text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-amber-300" />
              </h3>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed opacity-95 group-hover:text-white transition-colors duration-300">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EventInfo;

