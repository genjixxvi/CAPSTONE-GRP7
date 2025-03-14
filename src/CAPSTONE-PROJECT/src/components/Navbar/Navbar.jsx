import { NavbarMenu } from "./navData/data";
import { MdMenu } from "react-icons/md";
import React from "react";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import { motion } from "framer-motion";
import { SlideDown } from "../../utility/animation.jsx";
import { Link } from 'react-router-dom'; 
import logo from '../../assets/logo.png';

function Navbar() {

    const [open, setOpen] = React.useState(false);

    return ( 
        <>
            <nav className="navbar fixed top-0 left-0 w-full z-20 bg-opacity-10 backdrop-blur-sm">
                <motion.div
                variants={SlideDown(0.1)}
                initial="hidden"
                animate="visible"
                className="container flex justify-between items center pt-3 pb-3">
                    <div className="text-2xl flex items-center gap-2 font-bold">
                        <img src={logo} className="h-8 w-8" />
                        <p>knowledge<span className="text-secondary">Hub</span></p>
                    </div>
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-6 text-gray-600'>
                            {NavbarMenu.map((item) => {
                                return <li key={item.id}>
                                    <a href={item.link} className="inline-block py-2 px-6 hover:text-secondary font-semibold">
                                        {item.title}
                                    </a>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div>
                    <Link to='/auth'>
                        <button className=" items-center hover:bg-secondary text-secondary font-semibold hover:text-white rounded-md border-2 border-secondary px-6 py-2 duration-150 hidden md:block">
                        login
                        </button>
                    </Link>
                    </div>
                    <div className="md:hidden" onClick={() => setOpen(!open)}>
                        <MdMenu className="text-4xl" />
                    </div>
                </motion.div>
            </nav>

            <ResponsiveMenu open={open} />
        </>
    );
}

export default Navbar;