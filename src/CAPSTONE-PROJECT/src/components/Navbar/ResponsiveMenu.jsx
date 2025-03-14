import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ResponsiveMenu = ({ open }) => {
    return <AnimatePresence mode='wait'>
        {
            open && (
                <motion.div 
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }} 
                    transition={{ duration: 0.3 }}
                    className='absolute top-20 left-0 w-full h-screen z-20'
                    >
                    <div className='text-xl font-semibold uppercase bg-secondary text-white py-10 m-6 rounded-3xl'>
                        <ul className='flex flex-col justify-center items-center gap-10'>
                            <Link to='/'><li>Home</li></Link>
                            <Link to='/about'><li>About</li></Link>
                            <Link to='/contact-us'><li>Contact</li></Link>
                            <Link to='/faqs'><li>FAQs</li></Link>
                            <Link to='/auth'><li>Login</li></Link>
                        </ul>
                    </div>
                </motion.div>
            )
        }
    </AnimatePresence>
}

export default ResponsiveMenu;