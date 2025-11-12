import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { createPortal } from "react-dom";
import { motion,AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <nav className="backdrop-blur-md bg-gray-800/40 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h2 className="text-2xl font-bold tracking-wide text-white">
          <NavLink
            to="/"
            className="hover:text-indigo-400 transition-colors duration-300"
          >
            {" "}
            Port<span className="text-indigo-400">Folio</span>
          </NavLink>
        </h2>
        <ul className="hidden md:flex space-x-8 font-semibold">
          {["Home", "About", "Skills", "Project", "Experience"].map(
            (link) => (
              <li key={link}>
                <NavLink
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className={({ isActive }) =>
                    `relative text-gray-300 hover:text-indigo-400 transition duration-300 
                  ${isActive ? "text-indigo-400 after:w-full" : "after:w-0"}
                  after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-indigo-400 
                  after:transition-all after:duration-300 hover:after:w-full`
                  }
                >
                  {link}
                </NavLink>
              </li>
            )
          )}
        </ul>
        <button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu />
        </button>
      </div>

      {/*SideBar for mobile View */}
      
      {/* Sidebar for Mobile View */}
{createPortal(
  <AnimatePresence>
    {isSidebarOpen && (
      <>
        {/* Overlay */}
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={toggleSidebar}
        />

        {/* Sidebar Panel */}
        <motion.div
          key="sidebar"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", type: "tween" }}
          className="z-50 fixed top-0 right-0 h-full w-64 bg-gray-900 flex flex-col space-y-6 p-6 text-white"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Menu</h3>
            <button onClick={toggleSidebar}>
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {["Home", "About", "Skills", "Project", "Experience"].map((link) => (
              <NavLink
                key={link}
                onClick={toggleSidebar}
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="text-gray-400 hover:text-indigo-400 font-semibold text-lg px-4 transition duration-300"
              >
                {link}
              </NavLink>
            ))}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>,
  document.body
)}

    </nav>
  );
};

export default Navbar;
