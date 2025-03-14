import { UseStateContext } from '../context/contextProvider.jsx';
import wlcm from "../assets/welcome.svg";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';

function UserMessage() {
    const { user } = UseStateContext();
    console.log(user);

    return (
        <div className="bg-white p-6 rounded-lg max-w w-full">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                {user ? user.welcome_message : "Loading..."}
            </h2>
            <p className="text-gray-600 text-center">We&apos;re excited to have you with us!</p>
            <Link to='/home/Ebooks'>
                <button className='primary-btn px-3 mx-auto flex items-center m-4'>
                    Explore 
                    <span className='text-xl'>
                        <MdOutlineNavigateNext />
                    </span>
                </button>
            </Link>
            <img src={wlcm} alt="Welcome" className="w-[800px] mx-auto" />
        </div>
    );
}

export default UserMessage;