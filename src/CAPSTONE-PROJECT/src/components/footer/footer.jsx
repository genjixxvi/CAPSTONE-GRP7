import { FaDiscord, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

const footer = () => {
    return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-950 rounded-t-3xl">
        <div className="container ">
            <div className="grid md:grid-cols-4 md:gap-4 py-5 border-t-2 border-gray-300/10 text-white">
                <div className="py-8 px-4 space-y-4">
                    <div className="text-2xl flex items-center gap-2 font-bold">
                        <img src={logo} className="h-8 w-8"/>
                        <p>Knowledge<span className="text-secondary">Hub</span></p>
                    </div>
                    <p>
                        Discover endless stories and knowledge, Enjoy seamless reading on any devices, anytime, anywhere.
                    </p>
                    <div className="flex items-center justify-start gap-5 !mt-6 text-lg">
                        <a href="">
                            <FaDiscord />
                        </a>
                        <a href="">
                            <FaGithub />
                        </a>
                        {/* add icons */}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 md:ml-14">
                    <div className="py-8 px-4">
                        <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">Links</h1>
                        <ul className="flex flex-col gap-3">
                            <Link to='/home'>Home</Link>
                            <Link to='/about'>About</Link>
                            <Link to='/contact-us'>Contact</Link>
                            <Link to='/auth'>Login</Link>
                        </ul>
                    </div>
                    <div className="py-8 px-4">
                        <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">Resources</h1>
                        <ul className="flex flex-col gap-3">
                            <li>Gutendex</li>
                            <li>wikipedia</li>
                            <li>dictionaryapi</li>
                            {/* <li>to add</li> */}
                        </ul>
                    </div>
                    {/* another extra col */}
                    <div className="py-8 px-4">
                        <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">Team</h1>
                        <ul className="flex flex-col gap-3">
                            <li>Laurence Marie Tigres</li>
                            <li>Kyle Miscala</li>
                            <li>Daphnie Dolleno</li>
                            {/* <li>to add</li> */}
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                <div className="text-center py-6 border-t-2 border-gray-300/10">
                    <span className="text-sm text-gray-300 opacity-70">
                        © 2025 Cedar College Inc. All Rights Reserved. Capstone Project for BSIT.
                    </span>
                </div>
            </div>

        </div>
    </div>
    )
}

export default footer
