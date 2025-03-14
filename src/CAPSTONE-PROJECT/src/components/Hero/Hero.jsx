import { FaArrowRight } from "react-icons/fa";
import heroimg from '../../assets/heroimg.svg';
import { motion } from "framer-motion";
import { SlideRight, SlideLeft } from "../../utility/animation.jsx";
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <>
            <section>
                <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative mt-20">
                    <div className="flex flex-col justify-center py-14 md:py-0 font-poppins">
                        <div className="text-center md:text-left space-y-6">
                            <motion.h1
                            variants={SlideRight(0.6)}
                            initial="hidden"
                            animate="visible"
                            className="text-4xl lg:text-5xl font-bold leading-relaxed xl:leading-normal">
                                Discover Endless Stories and
                                <span className="text-secondary"> Knowledge</span>{" "}
                            </motion.h1>
                            <motion.p
                            variants={SlideRight(1.2)}
                            initial="hidden"
                            animate="visible"
                            className="text-gray-600 xl:max-w-[450px]">
                            Dive into a world of books, and more with our intuitive online reading app. Enjoy seamless reading on any devices, anytime, anywhere. Our extensive archive is just a tap away. Start your journey today!
                            </motion.p>
                            <motion.div
                            variants={SlideRight(1.5)}
                            initial="hidden"
                            animate="visible"
                            className="flex justify-center gap-8 md:justify-start !mt-4">
                                <Link to='/auth'>
                                    <button className="primary-btn flex items-center gap-2">
                                        Explore <FaArrowRight/>
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <motion.img
                        variants={SlideLeft(0.6)}
                        initial="hidden"
                        animate="visible"
                        src={ heroimg }
                        alt="books"
                        className="w-[250px] md:w-[350px] xl:w-[400px] drop-shadow"/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;