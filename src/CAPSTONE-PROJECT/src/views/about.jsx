import about from "../assets/about.svg";
import { SlideRight, SlideLeft } from "../utility/animation"
import { motion } from "framer-motion";
import Footer from "../components/footer/footer.jsx";

const About = () => {
    return (
      <>
        <div className="max-w-6xl mx-auto p-12 bg-white dark:bg-gray-900 shadow-xl rounded-2xl mt-36 flex flex-col md:flex-row items-center transition-all min-h-[500px] mb-40">
        <div className="w-full md:w-1/2 p-8">
          <motion.h2
            variants={SlideRight(0.3)}
            initial="hidden"
            animate="visible"
            className="text-4xl font-extrabold text-center md:text-left text-gray-800 dark:text-white mb-6">
            About 📖
          </motion.h2>
          <motion.p 
            variants={SlideRight(0.6)}
            initial="hidden"
            animate="visible"
            className="text-gray-600 dark:text-gray-300 text-center md:text-left mb-6">
            Welcome to KnowledgeHub, your go-to platform for discovering and accessing a wide range of educational resources. 
            We aim to provide an accessible and seamless learning experience, offering materials to suit every interest and preference.
          </motion.p>
          <motion.p
            variants={SlideRight(0.9)}
            initial="hidden"
            animate="visible"
            className="text-gray-600 dark:text-gray-300 text-center md:text-left">
            Our mission is to make learning more engaging and convenient for everyone. With personalized 
            features like saving resources and tracking your learning history, we bring knowledge to your fingertips. 📚✨
          </motion.p>
        </div>
        <div className="hidden md:flex md:w-1/2 justify-center">
          <motion.img
            variants={SlideLeft(0.3)}
            initial="hidden"
            animate="visible"
          src={about} alt="About Illustration" className="w-full max-w-sm" />
        </div>
      </div>
      <Footer />
      </>
    );
  };
  
  export default About;