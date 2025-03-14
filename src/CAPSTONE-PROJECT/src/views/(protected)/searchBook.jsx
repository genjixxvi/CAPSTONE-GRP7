import { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark, FaSearch, FaReadme, FaDownload } from "react-icons/fa";
import Modal from "../../components/modals/Modal.jsx";
import { saveBook } from "../../views/handler/saveBook.jsx";
import { removeBook } from "../../views/handler/removeBook.jsx";
import { UseStateContext } from "../../context/contextProvider.jsx";
import axiosClient from "../../axiosClient.js";
import { FourSquare } from "react-loading-indicators";
import sww from "../../assets/sww.svg";
import { readOnlineBtn } from "../handler/ReadHistory.jsx";
import searchBanner from "../../assets/searchBanner.svg";

export default function SearchBook() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [savedBooks, setSavedBooks] = useState(new Set());
  const [filter, setFilter] = useState("title");
  const { user } = UseStateContext();

  const handleSearch = () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    const searchUrl = filter === "author"
      ? `https://gutendex.com/books/?search=${query}&author=true`
      : `https://gutendex.com/books/?search=${query}`;

    fetch(searchUrl, { mode: "cors" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      });
  };

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

  const handleReadOnline = (book) => {
    if (user) {
      readOnlineBtn(book, user);
    }
    window.open(book.formats["text/html"], "_blank");
  };

  return (
    <div className="p-2">
      <div className="mb-4 mt-2 inline-flex relative">
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-secondary hover:border-secondary focus:text-white focus:bg-secondary focus:border-secondary active:border-secondary active:text-white active:bg-secondary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-4 gap-2 inline-flex items-center"
          type="button"
        >
          Search <FaSearch />
        </button>

        <div className="w-full max-w-sm min-w-[250px] relative">
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow pr-10"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="absolute right-2 top-1/3 transform -translate-y-1/2 text-slate-600 bg-transparent border-none cursor-pointer"
          >
            <option value="title">title</option>
            <option value="author">author</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center mt-8">
          <FourSquare color="#0033A0" size="large" text="LOADING" className="2" speedPlus="2" />
        </div>
      ) : error ? (
        <img src={sww} className="mt-[-50px]" />
      ) : (
        <>
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
            ) : null}
          </div>

          {books.length === 0 && (
            <div className="flex justify-center mt-8">
              <img src={searchBanner} alt="No books found" className="w-full max-w-[600px] object-contain" />
            </div>
          )}
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
                  onClick={() => handleReadOnline(selectedBook)}
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
