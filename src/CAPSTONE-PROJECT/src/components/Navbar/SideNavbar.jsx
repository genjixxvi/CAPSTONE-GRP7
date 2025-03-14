import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import { FaHome, FaBookmark, FaHistory } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";

export default function Sidebar({ isOpen, setIsOpen, toggleModal }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen overflow-y-auto bg-gray-800 text-white transition-all duration-300 z-50 p-4 flex flex-col
      ${isOpen ? "w-64" : "w-16"} items-start`}>
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="mb-4 text-white focus:outline-none text-xl font-bold self-center">
        {isOpen ? <span>knowledge<span className="text-secondary">Hub</span></span> : <Menu size={28} />}
      </button>

      {isOpen && <hr className="w-full border-gray-600 my-2" />}

      <ul className="mt-4 space-y-4 w-full">
        <li>
          <Link to='/home/Ebooks' className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded w-full">        
              <FaHome />
              {isOpen && <span>Home</span>}
          </Link>
        </li>
        <li>
          <Link to='/home/saved-books' className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded w-full">
            <FaBookmark />
            {isOpen && <span>Saved</span>}
          </Link>
        </li>
        <li>
          <Link to='/home/reading-history' className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded w-full">
            <FaHistory />
            {isOpen && <span>History</span>}
          </Link>
        </li>
        <li>
          <button 
            onClick={toggleModal} 
            className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded w-full">
            <IoIosSend />
            {isOpen && <span>Feedback</span>}
          </button>
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
