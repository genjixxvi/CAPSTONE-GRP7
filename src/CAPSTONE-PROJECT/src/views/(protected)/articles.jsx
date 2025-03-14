import { useState } from "react";
import { FourSquare } from "react-loading-indicators";
import articleBanner from "../../assets/article-banner.svg";

function Articles() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchWikipedia = async () => {
        if (!query) return;
        setLoading(true);
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResults(data.query.search);
        } catch (error) {
            console.error("Error fetching Wikipedia articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchArticleContent = async (title, pageid) => {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSelectedArticle({ ...data, pageid });
        } catch (error) {
            console.error("Error fetching article content:", error);
        }
    };

    return (
        <div className="p-6 sm:p-8 lg:p-10 w-full bg-gray-50">
            <h2 className="text-3xl font-bold text-center text-gray-800 my-4">Search For Articles</h2>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center mb-6">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Search..." 
                    className="border p-3 w-full sm:w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <button 
                    onClick={searchWikipedia} 
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                    Search
                </button>
            </div>

            {loading && 
                <div className="flex items-center justify-center mt-8">
                    <FourSquare color="#0033A0" size="large" text="LOADING" className="2" speedPlus="2" />
                </div>
            }

            {!selectedArticle ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {results.map((article) => (
                            <div key={article.pageid} className="p-4 bg-white rounded-md shadow-lg hover:bg-gray-100 transition">
                                <button 
                                    onClick={() => fetchArticleContent(article.title, article.pageid)}
                                    className="text-blue-600 font-semibold hover:underline text-lg"
                                >
                                    {article.title}
                                </button>
                            </div>
                        ))}
                    </div>

                    {!loading && results.length === 0 && (
                        <div className="flex items-center justify-center mt-8">
                            <img 
                                src={articleBanner} 
                                alt="Article Banner" 
                                className="m-2 p-2 h-[300px] sm:h-[400px] lg:h-[450px]" 
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full bg-white p-6 rounded-lg shadow-xl">
                    <h3 className="text-3xl font-bold mb-4">{selectedArticle.title}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{selectedArticle.extract}</p>
                    <a 
                        href={`https://en.wikipedia.org/?curid=${selectedArticle.pageid}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block mt-4 text-blue-500 hover:underline text-lg"
                    >
                        View More on Wikipedia
                    </a>
                    <button 
                        onClick={() => setSelectedArticle(null)}
                        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
                    >
                        Back to Search Results
                    </button>
                </div>
            )}
        </div>
    );
}

export default Articles;
