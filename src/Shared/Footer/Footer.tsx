import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";

const Footer: React.FC = () => {
  // const { darkMode } = useAuth() as any;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-main/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-main/2 rounded-full blur-3xl"></div>
      </div>

      {/* Subscription Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 py-16"
      >
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-main to-emerald-400 bg-clip-text text-transparent">
                Never Miss an Update
              </h2>
              <p className="mt-2 text-gray-400 max-w-md">
                Join our newsletter for exclusive offers and early access to events
              </p>
            </div>
            <div className="flex-1 w-full max-w-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-main hover:bg-main/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-main/30 transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12"
      >
        {/* Brand Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-main mb-6">EZY Ticket</h3>
          <p className="text-gray-400 mb-6 max-w-sm">
            Transforming your event experience with seamless ticketing solutions
          </p>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ y: -5 }}
                className="p-3 bg-white/5 rounded-xl hover:bg-main/20 transition-colors cursor-pointer"
              >
                <Icon className="text-xl text-gray-300 hover:text-main transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Navigation Sections */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Resources</h4>
          <div className="flex flex-col gap-4 text-gray-400">
            {['Application', 'Documentation', 'Systems', 'FAQ'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="hover:text-main transition-colors flex items-center gap-2 group"
              >
                <span className="w-2 h-2 bg-main rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Company</h4>
          <div className="flex flex-col gap-4 text-gray-400">
            {['About Us', 'Blog', 'Partnerships', 'Careers', 'Press'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-main transition-colors flex items-center gap-2 group"
              >
                <span className="w-2 h-2 bg-main rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {item}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Contact</h4>
          <div className="flex flex-col gap-5 text-gray-400">
            <div className="flex items-start gap-3 hover:text-main transition-colors">
              <FaLocationDot className="text-main mt-1 flex-shrink-0" />
              <span>Level 8, Tech Hub Tower<br/>Dhaka 1212, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 hover:text-main transition-colors">
              <IoMdMail className="text-main flex-shrink-0" />
              <span>support@ezyticket.com</span>
            </div>
            <div className="flex items-center gap-3 hover:text-main transition-colors">
              <FaPhone className="text-main flex-shrink-0" />
              <span>+880 19856 458656</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative z-10 border-t border-white/10 py-8 text-center text-gray-400"
      >
        <div className="max-w-7xl mx-auto px-4">
          &copy; {new Date().getFullYear()} EZY Ticket. All rights reserved.
          <div className="mt-2 text-sm">Powered by EZY Ticketing Solutions</div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
