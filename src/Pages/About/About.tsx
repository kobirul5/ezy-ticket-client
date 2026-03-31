import { IoIosArrowForward, IoIosTimer } from "react-icons/io";
import useAuth from "@/Hooks/useAuth";
import AboutCounter from "@/components/About/AboutCounter";
import { MdMoreTime } from "react-icons/md";
import { CiCreditCard1, CiMedicalClipboard } from "react-icons/ci";
import { FaBus, FaFacebookF, FaLinkedinIn, FaRegHandshake, FaTicketAlt } from "react-icons/fa";
import { TbColorFilter, TbPhoneCall, TbTicket } from "react-icons/tb";
import { IoCallOutline, IoColorFilterOutline } from "react-icons/io5";
import { PiHandshakeLight } from "react-icons/pi";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import noImage from "@/assets/Common_image/noImage.png";
import kobirulImage from "../../assets/Common_image/kobirul.jpg";

const About = () => {
  const { darkMode } = useAuth()! as any;

  const services=[
    {
      title: "Real-Time Availability",
      desc: "Live schedules",
    icon:<IoIosTimer />
    },
    {
      title: "Secure Payment",
      desc: "100% Safe",
      icon:<CiCreditCard1 />
    },
    {
      title: "Dashboard Manager",
      desc: "Helps Monitoring",
      icon:<CiMedicalClipboard />
    },
    {
      title: "Easy  Booking",
      desc: "Simple Process",
      icon:<IoColorFilterOutline />
    },
    {
      title: "Reliable Partners",
      desc: "Verified and top-rated.",
      icon:<PiHandshakeLight />
    },
    {
      title: "24/7 Support",
      desc: "When needed",
      icon:<IoCallOutline />
    },
  ]

  
  const leaders = [
    {
      name: "Mazharul Islam Sourav",
      role: "Team Lead",
      description: "Visionary leader with 8+ years of experience in product management and growth strategy.",
      image: "",
      socials: { linkedin: "https://www.linkedin.com/", github: "#", facebook: "#" }
    },
    {
      name: "Kobirul Islam",
      role: "Lead Developer",
      description: "Architect of our technical framework, specializing in high-performance web systems and scalable solutions.",
      image: kobirulImage,
      socials: { linkedin: "https://www.linkedin.com/in/kobirul-islam/", github: "https://github.com/kobirul5", facebook: "https://www.facebook.com/kobirul0k" }
    },
    {
      name: "Apu Roy",
      role: "Full Stack Developer",
      description: "Dedicated to crafting intuitive interfaces that blend aesthetics with functionality for a seamless experience.",
      image: "/apuroy.jpg",
      socials: { linkedin: "https://www.linkedin.com/", github: "#", facebook: "#" }
    },
    {
      name: "Mahdi Asif",
      role: "Full Stack Developer",
      description: "Passionate developer focusing on creating robust back-ends and elegant frontend integrations.",
      image: "/asif.jpg",
      socials: { linkedin: "https://www.linkedin.com/", github: "#", facebook: "#" }
    },
    {
      name: "Tanmoy",
      role: "Full Stack Developer",
      description: "Specialist in building highly responsive and dynamic user interfaces with clean, modern code.",
      image: "",
      socials: { linkedin: "https://www.linkedin.com/", github: "#", facebook: "#" }
    },
    {
      name: "Susanto",
      role: "Full Stack Developer",
      description: "Expert in database optimization and building secure, efficient server-side architectures.",
      image: "",
      socials: { linkedin: "https://www.linkedin.com/", github: "#", facebook: "#" }
    },
  ]

  return (
    <div className={` text-black   ${darkMode ? "text-white" : ""}`}>
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0">
          <img
            src="/contact2.jpg"
            alt="About Banner"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/10"></div>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-main/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-supporting/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="absolute top-20 right-20 text-white/20 text-6xl rotate-12 animate-float hidden md:block">
          <FaTicketAlt />
        </div>
        <div className="absolute bottom-40 right-10 text-main/30 text-5xl -rotate-12 animate-float-delayed hidden md:block">
          <FaBus />
        </div>
        <div className="absolute top-40 left-10 text-supporting/20 text-4xl rotate-45 animate-float hidden md:block">
          <TbTicket />
        </div>
        
        {/* Main Content Container */}
        <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-center">
          <div className="max-w-2xl">
            {/* Breadcrumb Glass Card */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-morphism rounded-full text-white/90 text-sm mb-6 animate-fade-in">
              <Link to="/" className="hover:text-main transition-colors">Home</Link>
              <IoIosArrowForward className="text-xs" />
              <span className="font-medium">About Us</span>
            </div>

            {/* Title with Gradient Text */}
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-emerald-300">Seamless</span> <br />
              Journeys for You
            </h1>

            {/* Description Glass Card */}
            <div className="glass-morphism p-6 rounded-2xl border-white/10 max-w-xl group hover:border-main/30 transition-all duration-500 mb-10">
              <p className="text-white/80 text-sm md:text-lg leading-relaxed ">
                We're redefining ticket booking with cutting-edge technology and human-centric design. Discover our mission to simplify your travel and event experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Wave/Shape Divider (Optional but adds flair) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,103.1,118.9,101.46,174,84.51c51.15-15.74,103.11-47.53,147.39-28.07Z" 
                  fill={darkMode ? "#121212" : "#F9FAFB"}></path>
          </svg>
        </div>
      </div>






      {/* Our Mission Section */}
      <div className="mt-20 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
   
        <img
          src="/about2.jpg"
          alt="Our Mission"
          className="rounded-xl shadow-lg"
        />
        
        <div className="flex flex-col gap-2">
          <p className="text-main text-xs md:text-base font-bold">WHAT WE DO</p>
          <h2 className="text-xl md:text-5xl font-semibold md:mb-4 ">
            We make your booking easier, seamless and enjoyable!
          </h2>
          <AboutCounter></AboutCounter>
          <p
            className={`text-sm md:text-lg leading-relaxed ${
              darkMode ? "text-gray-600" : ""
            }`}
          >
            We aim to simplify transportation and event experiences across the
            nation. Our platform empowers users to find, book, and manage travel
            and event plans with ease and efficiency — ensuring comfort,
            transparency, and trust at every step.
          </p>
        </div>
         </div>

      {/* Features Section */}
      <div className="mt-20 container mx-auto px-4">
        <h2 className="text-xl md:text-3xl font-semibold text-center  mb-12">
          {" "}
          Why Choose Us
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((feature, idx) => (
            <div
              key={idx}
              className={`p-2 md:p-12 flex flex-col justify-center items-center backdrop-blur-2xl shadow-2xl shadow-gray-500 ${
                darkMode ? "" : ""
              }`}
            >
              <p className="text-4xl ">{feature.icon}</p>
              <h3 className="text-sm md:text-xl text-main font-bold mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="my-32 container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-main font-bold tracking-widest uppercase text-sm mb-3">Our Visionaries</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800">
            Meet Our Exceptional Team
          </h2>
          <div className="w-24 h-1.5 bg-main mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((member, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-main/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-main/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-[2.5rem] bg-emerald-50 overflow-hidden border-4 border-white shadow-inner group-hover:rotate-3 transition-transform duration-500">
                    <img 
                      src={member.image || noImage} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  {/* Status dot or badge can go here */}
                  <div className="absolute -bottom-2 -right-2 bg-main text-white p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform">
                    <TbColorFilter className="text-xl" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-main transition-colors">
                    {member.name}
                  </h3>
                  <div className="inline-block px-4 py-1.5 bg-emerald-50 text-main rounded-full text-xs font-bold uppercase tracking-wider mt-2">
                    {member.role}
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed text-center mb-8 px-4 h-20 line-clamp-3">
                  {member.description}
                </p>

                <div className="flex gap-4 justify-center items-center pt-6 border-t border-slate-50 w-full group-hover:border-emerald-100 transition-colors">
                  <Link 
                    to={member.socials.linkedin} 
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-main hover:text-white transition-all transform hover:scale-110"
                    target="_blank"
                  >
                    <FaLinkedinIn />
                  </Link>
                  <Link 
                    to={member.socials.github} 
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-main hover:text-white transition-all transform hover:scale-110"
                    target="_blank"
                  >
                    <BsGithub />
                  </Link>
                  <Link 
                    to={member.socials.facebook} 
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-main hover:text-white transition-all transform hover:scale-110"
                    target="_blank"
                  >
                    <FaFacebookF />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action */}
      {/* <div className="flex justify-center mt-24">
        <button className="px-10 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
          Explore the Platform
        </button>
      </div> */}
    </div>
  );
};

export default About;
