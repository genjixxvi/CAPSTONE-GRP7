import { useState } from 'react';
import axios from 'axios';
import { FourSquare } from "react-loading-indicators";
import dictionaryBanner from "../../assets/dictionary-banner.svg";

function Dictionaries() {
    const [word, setWord] = useState('');
    const [definitions, setDefinitions] = useState([]);
    const [synonyms, setSynonyms] = useState([]);
    const [examples, setExamples] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchDefinition = async () => {
        try {
            setError('');
            setDefinitions([]);
            setSynonyms([]);
            setExamples([]);
            setLoading(true);

            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = response.data[0];
            
            const meanings = data.meanings;
            let allDefinitions = [];
            let allSynonyms = new Set();
            let allExamples = [];
            
            meanings.forEach((meaning) => {
                meaning.definitions.forEach((def) => {
                    allDefinitions.push(def.definition);
                    if (def.example) allExamples.push(def.example);
                });
                meaning.synonyms.forEach((syn) => allSynonyms.add(syn));
            });
            
            setDefinitions(allDefinitions);
            setSynonyms([...allSynonyms]);
            setExamples(allExamples);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Sorry, no definition found for that word.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-gray-50 py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">Dictionary</h1>

            {/* Input and Button */}
            <div className="flex flex-col sm:flex-row w-full max-w-3xl justify-center items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                    type="text"
                    placeholder="Enter a word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="border p-3 w-full sm:w-1/2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
                <button 
                    onClick={fetchDefinition} 
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                    Get Definition
                </button>
            </div>

            {!loading && definitions.length === 0 && synonyms.length === 0 && examples.length === 0 && !error && (
                <div className="flex items-center justify-center">
                    <img 
                        src={dictionaryBanner} 
                        alt="Dictionary Banner" 
                        className="m-2 p-2 h-[300px] sm:h-[400px] lg:h-[450px]" 
                    />
                </div>
            )}

            {loading && 
                <div className="flex items-center justify-center mt-8">
                    <FourSquare color="#0033A0" size="large" text="LOADING" className="2" speedPlus="2" />
                </div>
            }

            {/* Results */}
            <div className="w-full mt-6 px-4 sm:px-8 max-w-3xl">
                {definitions.length > 0 && (
                    <div className="text-left">
                        <h2 className="text-2xl font-semibold text-gray-700">Definitions:</h2>
                        <ul className="list-disc list-inside text-gray-600">
                            {definitions.map((def, index) => (
                                <li key={index} className="mt-2">{def}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {synonyms.length > 0 && (
                    <div className="text-left mt-6">
                        <h2 className="text-2xl font-semibold text-gray-700">Synonyms:</h2>
                        <p className="text-gray-600">{synonyms.join(', ')}</p>
                    </div>
                )}

                {examples.length > 0 && (
                    <div className="text-left mt-6">
                        <h2 className="text-2xl font-semibold text-gray-700">Example Sentences:</h2>
                        <ul className="list-disc list-inside text-gray-600">
                            {examples.map((example, index) => (
                                <li key={index} className="mt-2">{example}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {error && <p className="text-red-500 mt-6 font-semibold">{error}</p>}
            </div>
        </div>
    );
}

export default Dictionaries;
