import { GiBookshelf } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { PiBooksFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { SlideRight } from "../../utility/animation.jsx";

const offerData = [
    {
        id: 1,
        title: 'E-books',
        desc: 'Explore the vast collection of e-books, read anytime, anywhere',
        icon: <GiBookshelf />,
        delay: 0.2,
    },
    {
        id: 2,
        title: 'Dictionaries',
        desc: 'Access comprehensive dictionaries to find definitions, synomyms, and translations for various words',
        icon: <IoBookSharp />,
        delay: 0.4,
    },
    {
        id: 3,
        title: 'Articles',
        desc: 'Browse through a wide range of articles on various topics, from academic research to general knowledge',
        icon: <PiBooksFill />,
        delay: 0.8,
    },
];

function offer() {
    return (
        <div>
            <div className="container py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-poppins">
                    <div className="space-y-4 p-6">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            What we offer for you?
                        </h1>
                        <p className="text-gray-500">
                            Secure and organized digital archive, making it easy to access important resources anytime.
                        </p>
                    </div>
                    {offerData.map((item) => {
                        return (
                            <motion.div
                                variants={SlideRight(item.delay)}
                                initial="hidden"
                                whileInView="visible"
                                key={item.id}
                                className="bg-gray-100 space-y-4 p-6 hover:bg-white rounded-xl hover:shadow-[0_0_22px_0_rgba(0,0,0,0.15)]">
                                <div className="text-4xl">
                                    {item.icon}
                                </div>
                                <h1 className="text-2xl font-semibold">
                                    {item.title}
                                </h1>
                                <p className="text-gray-500">
                                    {item.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default offer;