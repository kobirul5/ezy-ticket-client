import { IoIosArrowForward, IoIosTimer } from "react-icons/io";
import useAuth from "@/Hooks/useAuth";
import AboutCounter from "@/components/About/AboutCounter";
import { MdMoreTime } from "react-icons/md";
import { CiCreditCard1, CiMedicalClipboard } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaRegHandshake } from "react-icons/fa";
import { TbColorFilter, TbPhoneCall } from "react-icons/tb";
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
      <div
        className={` relative text-center ${darkMode ? "text-gray-600" : ""}`}
      >
        <div className="relative ">
          <img
            src="/contact2.jpg"
            alt=""
            className=" w-full object-cover h-[200px] md:h-[400px]"
          />
          <div className="bg-gradient-to-l from-black/50 to-gray-700/90 inset-0 absolute"></div>
        </div>

        <div className=" absolute top-20 md:top-45 ml-7 md:ml-20 text-white text-md md:text-xl mb-16">
          <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-4">About Us</h1>
          <p className="flex text-gray-200">
            Home <IoIosArrowForward className="my-auto" /> About
          </p>
          {/* <p className="text-lg max-w-2xl mx-auto">
                  We"d love to hear from you! Whether you have a question, feedback, or just want to say hello — we’re here to help.
                </p> */}
        </div>



        {/* Header Section */}
        {/* <div className="relative flex h-[500px] overflow-hidden mt-32">
        
          <div className="w-full">
            <img
              src="/about1.jpg"
              alt="Side"
              className="h-full w-full object-cover"
            />
          </div>

       
          <div className="absolute top-0 right-0 h-full w-1/2 bg-white z-10 clip-diagonal-reverse pl-44 shadow-lg overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4">What We Are</h2>
            <p className="text-gray-700">
            We aim to simplify transportation and event experiences across the nation. Our platform empowers users to find, book, and manage travel and event plans with ease and efficiency — ensuring comfort, transparency, and trust at every step.
            </p>
            
          </div>
        </div> */}

      </div>






      {/* Our Mission Section */}
      <div className="mt-20 w-10/12 md:w-full md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
   
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
      <div className="mt-20 w-10/12 max-w-6xl mx-auto">
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
      <div className="my-32 w-11/12 max-w-7xl mx-auto">
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
