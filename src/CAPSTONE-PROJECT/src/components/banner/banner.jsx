import Banner from "../../assets/banner.svg";
import { motion } from "framer-motion";
import { SlideUp } from "../../utility/animation";
import { Link } from "react-router-dom";

function banner(){
  return (
    <div className="container">
        <div className="bg-[#f9f9f9] grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 py-14">
            <div>
                <motion.img 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1}}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    src={Banner}
                    alt="banner"
                    className="w-[300px] md:max-w-[400px] xl:min-w-[600px] h-full object-cover"/>
            </div>
            <div className="flex flex-col justify-center text-center md:text-left space-y-4 lg:max-w-[500px]">
                <motion.p
                    variants={SlideUp(0.2)}
                    initial="hidden"
                    whileInView={"visible"}
                    viewport={{ once: true}}
                    className="text-2xl lg:text-4xl font-bold capitalize font-poppins"
                >
                Experience a Personalized Learning Journey
                </motion.p>
                <motion.p
                    variants={SlideUp(0.4)}
                    initial="hidden"
                    whileInView={"visible"}
                    viewport={{ once: true}}
                >
                    Create own Personalized acccount and enjoy tailored educational experience. Save and organize resources based on your interest, track your reading history for easy access to past materials, and access integrated dictionaries and articles to enhance your learning. Sign up today and take control of your edducational journey!
                </motion.p>
                <motion.div
                    variants={SlideUp(0.6)}
                    initial="hidden"
                    whileInView={"visible"}
                    viewport={{ once: true}}
                    className="flex justify-center md:justify-start"
                >
                    <Link to='/auth'>
                        <button className="primary-btn">
                            Create now
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default banner;
