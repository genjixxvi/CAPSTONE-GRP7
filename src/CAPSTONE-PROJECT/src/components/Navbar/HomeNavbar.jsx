import { useState, useEffect, useRef } from "react";
import {  
    FaCog, 
    FaSignOutAlt,  
    FaBook, 
    FaBookOpen, 
    FaNewspaper,
} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { UseStateContext } from "../../context/contextProvider.jsx";
import { Link } from "react-router-dom"; 
import logo from '../../assets/logo.png';
import profile from '../../assets/profile.jpg';

const HomeNavbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { logout, user } = UseStateContext();
    const dropdownRef = useRef(null);
    const profilePictureUrl = user.profile_picture ? user.profile_picture : profile;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="flex items-center justify-between bg-white shadow-md p-2 pr-6 rounded-lg font-poppins ml-[60px] relative">
            <div className="flex items-center">
                <Link 
                    to='/home/Ebooks'
                    className="text-2xl font-semibold text-gray-800 no-underline ml-6">
                    <img src={logo} className="h-8 w-8"/>
                </Link>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-14 left-0 w-full bg-white shadow-md p-2 flex flex-col md:hidden">
                    <Link to='/home/Ebooks' className="p-2 flex items-center gap-2 hover:bg-gray-100"><FaBook /> E-Books</Link>
                    <Link to="/home/dictionaries" className="p-2 flex items-center gap-2 hover:bg-gray-100"><FaBookOpen /> Dictionary</Link>
                    <Link to='/home/articles' className="p-2 flex items-center gap-2 hover:bg-gray-100"><FaNewspaper /> Articles</Link>
                </div>
            )}

            <div className="flex items-center gap-6 relative dropdown-container" ref={dropdownRef}>
                <div className="hidden md:flex items-center gap-6 text-gray-700">
                    <Link to='/home/Ebooks' className="flex items-center gap-2 hover:text-secondary"><FaBook /> E-Books</Link>
                    <Link to='/home/dictionaries' className="flex items-center gap-2 hover:text-secondary"><FaBookOpen /> Dictionary</Link>
                    <Link to='/home/articles' className="flex items-center gap-2 hover:text-secondary"><FaNewspaper /> Articles</Link>
                </div>

                <button 
                    className="md:hidden flex items-center text-gray-700 hover:text-secondary" 
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                    Menu <RiArrowDropDownLine />
                </button>

                <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className="relative flex items-center focus:outline-none rounded-full 
                            border-2 border-transparent transition duration-300 ease-in-out 
                            hover:border-secondary hover:shadow-lg"
                    >
                    <img 
                        src={profilePictureUrl} 
                        className="w-10 h-10 rounded-full transition duration-300 transform 
                                hover:scale-105 hover:opacity-90"
                        alt="Avatar" 
                    />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-[210px] w-56 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden z-50">
                        <div className="flex items-center gap-2 p-3 border-b">
                            <img 
                            src={profilePictureUrl} 
                            className="w-10 h-10 rounded-full object-cover aspect-square overflow-hidden" 
                            alt="Avatar" />
                            <div className="max-w-[150px]">
                                <h6 className="text-gray-800 font-semibold">{user?.name}</h6>
                                <small className="text-gray-500 text-[0.7rem]">{user?.email}</small>
                            </div>
                        </div>
                        <Link to='/home/user/update-profile' className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                            <FaCog className="w-4 h-4" /> Settings
                        </Link>
                        <hr />
                        <button onClick={logout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100">
                            <FaSignOutAlt className="w-4 h-4" /> Sign out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default HomeNavbar;
