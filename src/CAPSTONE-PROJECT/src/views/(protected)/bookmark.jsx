import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient.js";
import { UseStateContext } from "../../context/contextProvider.jsx";
import { removeBook } from "../handler/removeBook.jsx";
import { FaDownload, FaReadme } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const UserSavedBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const { user } = UseStateContext();

  useEffect(() => {
    if (!user?.id) return;

    axiosClient
      .get(`/saved-books/${user.id}`)
      .then((response) => {
        setSavedBooks(response.data.books);
      })
      .catch((error) => {
        console.error("Error fetching saved books:", error.response?.data || error.message);
      });
  }, [user]);

  const handleRemoveBook = (bookId) => {
    setSavedBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== bookId));

    removeBook(bookId, user.id)
      .catch((error) => {
        console.error("Error removing book:", error);
        alert("Error removing book. Please try again.");
      });
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-4">My Saved Books</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {savedBooks.length > 0 ? (
          savedBooks.map((book) => (
            <div
              key={book.book_id}
              className="flex flex-col max-w-[180px] p-2 border rounded shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              style={{ height: "320px" }} // Adjust height for smaller card
            >
              <div className="relative flex-grow">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-[200px] object-cover rounded hover:opacity-80 transition-opacity duration-300"
                />
                <button
                  onClick={() => handleRemoveBook(book.book_id)}
                  className="absolute top-2 right-2 p-2 bg-white shadow-md hover:bg-gray-200 transition rounded-full"
                >
                  <IoMdRemoveCircleOutline className="text-red-600 text-lg" />
                </button>
              </div>

              <h3 className="text-lg font-semibold mt-2 truncate hover:text-blue-600 transition-colors duration-300" title={book.title}>{book.title}</h3>
              <p className="text-sm text-gray-600 truncate hover:text-gray-800 transition-colors duration-300" title={book.author || "Unknown Author"}>{book.author || "Unknown Author"}</p>

              <div className="flex gap-2 mt-auto">
                <a
                  href={book.download_format}
                  download
                  className="text-white flex items-center justify-center gap-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 transition rounded-md text-lg"
                >
                  <FaDownload className="text-xl" />
                </a>
                <a
                  href={book.read_format}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center justify-center gap-2 px-3 py-1 bg-green-500 hover:bg-green-600 transition rounded-md text-lg"
                >
                  <FaReadme className="text-xl" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No saved books found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSavedBooks;
