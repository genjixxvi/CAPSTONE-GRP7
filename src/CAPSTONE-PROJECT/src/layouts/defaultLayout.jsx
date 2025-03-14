import { Navigate, Outlet } from 'react-router-dom'; 
import { UseStateContext } from '../context/contextProvider.jsx';
import HomeNavbar from '../components/Navbar/HomeNavbar.jsx';
import Sidebar from '../components/Navbar/SideNavbar.jsx';
import { useState } from 'react';
import FeedbackPage from '../views/(protected)/feedBack.jsx';

function DefaultLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token } = UseStateContext();

    if (!token) {
        return <Navigate to='/' />;
    }

    const toggleModal = () => {
        setIsModalOpen((prevState) => !prevState);
    };

    return (
        <div className="relative flex h-screen">
            <Sidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
                toggleModal={toggleModal}
            />
            <div className="flex-1 ml-16 transition-all duration-300">
                <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
                    <HomeNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
                <div className="w-full max-w-7xl mx-auto mt-[5.5rem] px-4 sm:px-6 lg:px-8 pb-8">
                    <Outlet />
                    <FeedbackPage isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
