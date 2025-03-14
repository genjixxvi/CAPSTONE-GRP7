import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaRegBookmark, FaBookmark, FaDownload, FaReadme, FaSearch } from "react-icons/fa";
import Modal from "../../components/modals/Modal.jsx";
import { saveBook } from "../../views/handler/saveBook.jsx";
import { removeBook } from "../../views/handler/removeBook.jsx";
import { UseStateContext } from "../../context/contextProvider.jsx";
import axiosClient from "../../axiosClient.js";
import { readOnlineBtn } from "../handler/ReadHistory.jsx";
import { FourSquare } from "react-loading-indicators";
import sww from "../../assets/sww.svg";
import { MdNavigateNext, MdNavigateBefore, MdOutlineFirstPage } from "react-icons/md"; 

export default function Home() {
  const { page } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [savedBooks, setSavedBooks] = useState(new Set());
  const { user } = UseStateContext();
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://gutendex.com/books/?page=${currentPage}`, { mode: "cors" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data.results || []);
        setTotalPages(data.count ? Math.ceil(data.count / 10) : 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(parseInt(page) || 1);
  }, [page]);

  useEffect(() => {
    if (!user) return;
    axiosClient.get(`/saved-books/${user.id}`)
      .then((res) => {
        if (Array.isArray(res.data.books)) {
          const savedBookIds = new Set(res.data.books.map(book => book.book_id));
          setSavedBooks(savedBookIds);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch(error => console.error("Error fetching saved books:", error));
  }, [user]);

  const handleBookmarkToggle = (book) => {
    if (savedBooks.has(book.id)) {
      removeBook(book.id, user.id);
      setSavedBooks(prev => {
        const newSavedBooks = new Set(prev);
        newSavedBooks.delete(book.id);
        return newSavedBooks;
      });
    } else {
      saveBook(book, user);
      setSavedBooks(prev => new Set(prev).add(book.id));
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/home/page/${newPage}`);
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i >= currentPage - 2 && i <= currentPage + 2) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="p-4">
      {loading && !error ? (
        <div className="flex items-center justify-center mt-8">
          <FourSquare color="#0033A0" size="large" text="LOADING" className="2" speedPlus="2" />
        </div>
      ) : error ? (
        <img src={sww} className="mt-[-50px]" />
      ) : (
        <>
          <Link to='/home/search'>
            <button className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-secondary hover:border-secondary focus:text-white focus:bg-secondary focus:border-secondary active:border-secondary active:text-white active:bg-secondary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-4 gap-2 inline-flex items-center" type="button">Search <FaSearch /></button>
          </Link>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.length > 0 ? (
              books.map((book) => (
                <li
                  key={book.id}
                  className="flex flex-col max-w-[180px] p-2 border rounded shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300"
                  style={{ height: "320px" }}
                >
                  <div className="relative flex-grow">
                    <img
                      src={book.formats["image/jpeg"] || "https://via.placeholder.com/200"}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-[200px] object-cover rounded hover:opacity-80 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-2 truncate hover:text-blue-600 transition-colors duration-300" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate hover:text-gray-800 transition-colors duration-300" title={book.authors.map((author) => author.name).join(", ") || "Unknown Author"}>
                    {book.authors.map((author) => author.name).join(", ") || "Unknown Author"}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-auto">
                    <a
                      onClick={() => setSelectedBook(book)}
                      className="text-white flex items-center gap-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 transition rounded-md text-sm cursor-pointer"
                    >
                      View Details
                    </a>
                    <button
                      onClick={() => handleBookmarkToggle(book)}
                      className={`p-2 shadow-md rounded-full ${savedBooks.has(book.id) ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-200"}`}
                    >
                      {savedBooks.has(book.id) ? <FaBookmark /> : <FaRegBookmark className="text-gray-700" />}
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-lg">No books found.</p>
            )}
          </div>

          <div className="flex justify-center items-center space-x-2 flex-wrap mt-8">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(1)}
                className="min-w-[36px] rounded-md bg-blue-600 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 inline-flex items-center"
              >
                <MdOutlineFirstPage /> FIRST
              </button>
            )}

            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                className="min-w-[36px] rounded-md bg-blue-600 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 inline-flex items-center"
              >
                <MdNavigateBefore /> PREV
              </button>
            )}

            {generatePageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-4 py-2 rounded-lg ${currentPage === number ? "min-w-[36px] rounded-md border border-blue-500 text-center text-sm transition-all shadow-sm hover:shadow-lg text-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 active:border-blue-600 active:text-white active:bg-blue-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" : "bg-white hover:bg-gray-200 text-gray-700 hover:text-blue-500 border border-transparent"}`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="min-w-[36px] rounded-md border border-blue-500 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 active:border-blue-600 active:text-white active:bg-blue-600 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 inline-flex items-center"
            >
              NEXT <MdNavigateNext />
            </button>
          </div>
        </>
      )}

      {selectedBook && (
        <Modal onClose={() => setSelectedBook(null)}>
          <div className="flex flex-col md:flex-row p-6 max-w-4xl mx-auto bg-white shadow-lg h-[80vh] overflow-hidden rounded-lg">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={selectedBook.formats["image/jpeg"] || "https://via.placeholder.com/200"}
                alt={`Cover of ${selectedBook.title}`}
                className="w-2/3 md:w-full object-cover rounded-md"
              />
            </div>
            <div className="w-full md:w-2/3 pl-6 overflow-y-auto h-full pr-4">
              <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
              <p className="text-gray-700 mt-2">Author: {selectedBook.authors.map((author) => author.name).join(", ") || "Unknown"}</p>
              <p className="text-gray-700 mt-2">Publish: Not provided</p>
              <p className="text-gray-700 mt-2">Download Count: {selectedBook.download_count}</p>
              <p className="text-gray-700 mt-2">Genres: {selectedBook.bookshelves.join(", ") || "N/A"}</p>
              <p className="text-gray-700 mt-4">Summary: {selectedBook.summaries ? selectedBook.summaries[0] : "No summary available."}</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a
                  href={selectedBook.formats["application/epub+zip"]}
                  download
                  className="text-white px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center space-x-2"
                >
                  <FaDownload />
                  <span>Download</span>
                </a>
                <a
                  href={selectedBook.formats["text/html"]}
                  onClick={() => readOnlineBtn(selectedBook, user)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white gap px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md flex items-center space-x-2"
                >
                  <FaReadme />
                  <span>Read Online</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
