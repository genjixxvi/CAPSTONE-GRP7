import { useState } from "react";
import contactUs from '../assets/contactUs.svg';
import { SlideRight, SlideLeft } from "../utility/animation";
import { motion } from "framer-motion";
import Footer from "../components/footer/footer.jsx";
import axiosClient from "../axiosClient.js";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClient.post("/contact-us", formData);
      setSucces(response.data.message);
      setFormData(
        { name: "", email: "", message: "" }
      );
    } catch (error) {    
      console.error("Error Submitting form:", error.response?.data || error);
      setError("Failed to send message, Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
    <div className="max-w-6xl mx-auto p-4 md:p-12 bg-white dark:bg-gray-900 shadow-xl rounded-2xl mt-14 flex flex-col md:flex-row items-center transition-all mb-4">
      <motion.div
        variants={SlideRight(0.3)}
        initial="hidden"
        animate="visible"
        className="hidden md:flex md:w-5/12 justify-center mb-8 md:mb-0">
        <img src={contactUs} alt="Contact Illustration" className="w-full max-w-sm" />
      </motion.div>
      <div className="w-full md:w-7/12 p-8">
        <motion.h2
          variants={SlideLeft(0.3)}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-6">
          Contact Us 
        </motion.h2>
        <motion.p
          variants={SlideLeft(0.6)}
          initial="hidden"
          animate="visible"
          className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Have any questions or suggestions? Feel free to reach out!
        </motion.p>
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            variants={SlideLeft(0.9)}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full sm:w-[400px] px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your name"
              required
            />
          </motion.div>
          <motion.div
            variants={SlideLeft(0.9)}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full sm:w-[400px] px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </motion.div>
          <motion.div
            variants={SlideLeft(0.9)}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full sm:w-[400px] px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows="5"
              placeholder="Write your message here..."
              required
            ></textarea>
          </motion.div>
          <motion.div
            variants={SlideLeft(1.2)}
            initial="hidden"
            animate="visible"
          >
          <button
              type="submit"
              className="w-full sm:w-[400px] bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-80 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Contact;
