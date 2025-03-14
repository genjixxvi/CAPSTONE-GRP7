import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { UseStateContext } from "../../context/contextProvider.jsx";
import axiosClient from "../../axiosClient.js";
import { removeHistory } from "../handler/removeHistory.jsx";

const ReadingHistory = () => {
    const [history, setHistory] = useState([]);
    const [removing, setRemoving] = useState(null);
    const { user } = UseStateContext();

    useEffect(() => {
        const fetchReadingHistory = async () => {
            if (user) {
                try {
                    const response = await axiosClient.get(`/reading-history/${user.id}`);
                    setHistory(response.data);
                } catch (error) {
                    console.error("Error fetching reading history:", error);
                }
            }
        };

        fetchReadingHistory();
    }, [user]);

    const handleRemoveBook = async (bookId) => {
        console.log("Attempting to remove book - user ID:", user?.id, "book ID:", bookId);

        if (!user?.id || !bookId) {
            alert("Invalid user or book ID.");
            return;
        }

        setRemoving(bookId);
        const previousHistory = [...history];

        setHistory((prevHistory) => prevHistory.filter((book) => book.book_id !== bookId));

        try {
            await removeHistory(bookId, user.id);
            console.log("Book successfully removed:", bookId);
        } catch (error) {
            console.error("Error removing book:", error.response?.data || error.message);
            alert("Error removing book. Please try again.");
            setHistory(previousHistory);
        } finally {
            setRemoving(null);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Reading History</h2>
            {history.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {history.map((book) => (
                        <li
                            key={book.book_id}
                            className="flex flex-col max-w-[180px] p-2 border rounded shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300"
                            style={{ height: "320px" }}
                        >
                            <div className="relative flex-grow">
                                <img
                                    src={book.cover || "https://via.placeholder.com/200"}
                                    alt={`Cover of ${book.title}`}
                                    className="w-full h-[200px] object-cover rounded hover:opacity-80 transition-opacity duration-300"
                                />
                            </div>
                            <h3 className="text-lg font-semibold mt-2 truncate hover:text-blue-600 transition-colors duration-300" title={book.title}>{book.title}</h3>
                            <p className="text-sm text-gray-600 truncate hover:text-gray-800 transition-colors duration-300" title={book.author}>{book.author}</p>
                            <p className="text-xs text-gray-500 mt-1 truncate" title={new Date(book.updated_at).toLocaleString()}>{new Date(book.updated_at).toLocaleString()}</p>
                            <div className="flex items-center justify-between gap-2 mt-auto">
                                <a
                                    href={book.read_format}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white flex items-center gap-2 px-3 py-1 bg-green-500 hover:bg-green-600 transition rounded-md text-sm"
                                >
                                    Read Book
                                </a>
                                <button
                                    onClick={() => handleRemoveBook(book.book_id)}
                                    className={`text-red-500 p-2 rounded-full hover:bg-red-200 transition ${
                                        removing === book.book_id ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    disabled={removing === book.book_id}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </li>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg">No reading history available.</p>
            )}
        </div>
    );
};

export default ReadingHistory;
