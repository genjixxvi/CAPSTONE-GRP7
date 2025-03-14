import { useState } from "react";
import { Star } from "lucide-react";
import PropTypes from "prop-types";
import { UseStateContext } from "../../context/contextProvider";
import axiosClient from "../../axiosClient.js";

export default function FeedbackPage({ isOpen, setIsOpen }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { user } = UseStateContext();

  const handleSubmit = async () => {
    if (!rating || !feedback) {
      alert("Please provide a rating and feedback before submitting.");
      return;
    }  

    const feedbackData = {
      user_id: user.id,
      profile_picture: user.profile_picture,
      name: user.name,
      email: user.email,
      rating,
      feedback,
    };
    try {
      const response = await axiosClient.post("/feedback", feedbackData);
      alert("Thank you for your feedback!");
      console.log("Feedback submitted:", response.data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error);
      alert("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex md:w-[700px] max-w-3xl relative ml-10">
            <button className="absolute top-3 right-3 text-gray-600" onClick={() => setIsOpen(false)}>
              ✕
            </button>

            <div className="w-1/3 bg-blue-500 items-center justify-center text-white text-2xl font-bold p-6 hidden lg:flex">
              Share Your Thoughts!
            </div>
            <div className="w-full lg:w-2/3 flex flex-col justify-center items-center p-8">
              <h2 className="text-2xl font-semibold mb-4">Rate Your Experience</h2>

              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                      (hover || rating) >= star ? "text-yellow-500" : "text-gray-400"
                    }`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <textarea
                placeholder="Write your feedback here..."
                className="w-full h-32 p-3 border rounded-lg"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSubmit}>
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

FeedbackPage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
