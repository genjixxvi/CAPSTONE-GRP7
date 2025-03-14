import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Footer from "../components/footer/footer.jsx";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I save a E-book to my favorites?",
    answer:
      "Click the bookmark icon on the E-book you want to save. Clicking it again will remove the book from favorites.",
  },
  {
    question: "How does reading history work?",
    answer:
      "Your reading history is automatically tracked whenever you open a book. You can view your history in your Sidebar.",
  },
  {
    question: "Can I update my profile information?",
    answer:
      "Yes! Click the circle profile in the navigation bar and then click settings",
  },
  {
    question: "What happens if I forget my password?",
    answer:
      "Click the 'Forgot Password' link on the login page and you can reset it by entering your Email",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use encryption and best security practices to keep your data safe.",
  },
  {
    question: "How does the dictionary feature work?",
    answer:
      "You can search for word meanings within the dictionary section. Simply enter a word, and we'll provide definitions and examples.",
  },
  {
    question: "Can I read articles on this platform?",
    answer:
      "Yes! We have a dedicated articles section where you can read various topics",
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1}}
    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    className="max-w-5xl mx-auto p-6 flex flex-col items-center mb-20">
      <h2 className="text-3xl font-bold text-center mb-8 mt-16">Frequently Asked Questions</h2>
      <div className="w-full flex flex-col items-center">
        <div className="space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-white shadow-md cursor-pointer w-full"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
    <Footer />
    </>
  );
}
