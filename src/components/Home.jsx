import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturesSection from "../components/Feature";
import axios from 'axios'



const Home = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(parseInt(localStorage.getItem('lastPage')) || 0);
    const [totalPages, setTotalPages] = useState(0);
    // Track total pages

    const maxResults = 20;

    const search = async (e, newStartIndex = 0) => {
        e?.preventDefault();
        if (!query) {

            window.alert("Please enter a search query before clicking Search.");
            return;
        }

        setLoading(true);
        setStartIndex(newStartIndex);
        localStorage.setItem('lastQuery', query);
        localStorage.setItem('lastPage', newStartIndex);



        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                params: {
                    q: query,
                    maxResults: maxResults,
                    startIndex: newStartIndex
                }
            });
            if (response.data.items && response.data.items.length > 0) {
                setBooks(response.data.items);
                setErrorMessage('');
                const totalItems = response.data.totalItems; // Total number of items found
                const totalPages = Math.ceil(totalItems / maxResults); // Calculate total pages
                setTotalPages(totalPages);
            } else {
                setBooks([]);
                setErrorMessage('No such book found.');
            }
        } catch (error) {
            console.error("THE ERROR IS ", error);
            setErrorMessage('An error occurred while fetching data. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    }

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    const closePopup = () => {
        setSelectedBook(null);
    };

    const Isbn = (book) => {
        const industryIdentifiers = book.volumeInfo.industryIdentifiers || [];

        const isbn10 = industryIdentifiers.find(identifier => identifier.type === 'ISBN_10');
        const isbn13 = industryIdentifiers.find(identifier => identifier.type === 'ISBN_13');

        return {
            isbn10: isbn10 ? isbn10.identifier : 'null',
            isbn13: isbn13 ? isbn13.identifier : 'null'
        }
    }

    // Function to add a book to favorites (localStorage)
    const addToFavorites = (book) => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        // Check if the book already exists in favorites
        if (!favorites.some(fav => fav.id === book.id)) {
            favorites.push(book); // Add the new book
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert('Book added to favorites!');
        } else {
            alert('This book is already in your favorites.');
        }
    };




    return (
        <>

            <div className="h-screen">
                {/*First Segment*/}
                <div id="searchfunction" className="bg-[url('../my_library_bg.jpg')] bg-cover bg-center  h-5/6 content-center md:mt-1 px-4 py-1">
                    <div className="flex flex-col items-center mt-6">
                        {/*banner*/}
                        <div className="bg-slate-900 bg-opacity-40 rounded-lg px-4 py-5 w-full md:w-1/2 text-center flex flex-col justify-center mt-6">

                            <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl text-white">
                            📖FindMyBookNow

                            </h1>

                            <h2 className="font-semibold text-lg sm:text-xl md:text-2xl text-white mt-10">
                                Effortlessly search for books, compare prices, and access previews from various platforms, all in one place.
                            </h2>


                        </div>
                        {/*search bar*/}
                        <div className="flex flex-row justify-center mt-6 w-full md:w-full">
                            <input
                                type="text"
                                placeholder="Search for Books with title..."
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); debouncedSearch(null, 0); }}
                                className="border rounded focus:ring-2 focus:ring-slate-500 focus:outline-none p-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        search();
                                    }
                                }}
                            />
                            <button
                                onClick={search}
                                type="submit"
                                className="bg-slate-800 text-white rounded active:bg-slate-700 p-3.5 mt-0"
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </div>


                {/*Search Results*/}
                <div className="bg-white flex justify-center">
                    <div>{errorMessage && (
                        <p className="text-2xl my-2 text-bold shadow shadow-slate-600 rounded-lg p-3 text-black">
                            {errorMessage}
                        </p>
                    )}</div>
                    {loading ? (
                        <div className='flex justify-center p-5'>
                            <img src="./loadinggif.gif" className="w-30 h-20"
                                alt="YOUR SEARCH RESULTS ARE LOADING...." />
                        </div>
                    ) :
                        !errorMessage && books.length > 0 ? (
                            <div className=''>
                                <div className='p-5 flex mt-5 mx-9 rounded-lg justify-center'>
                                    <h2 className='text-2xl text-bold'>YOUR SEARCH RESULTS</h2>
                                </div>
                                <hr className='mx-20' />
                                <div className="bg-green-50 bg-opacity-50 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center content-center px-20 py-5  mb-2">

                                    {books.map((book) => (

                                        <div key={book.id} className=' shadow border border-4xl border-slate-800 rounded-md p-3'>

                                            <h3 className='text-xl text-center font-bold text-black'>{book.volumeInfo.title}</h3>
                                            <p className='text-semibold text-center truncate text-black'>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                                            <hr className='my-2 mx-0 w-full h-2'/>
                                            <div className="flex justify-center">
                                                <img src={
                                                    book.volumeInfo.imageLinks?.thumbnail ||
                                                    'https://via.placeholder.com/150'} alt={book.volumeInfo.title} className='rounded-md shadow max-h-40 object-contain'></img>
                                            </div>
                                            <div className='flex justify-center m-1'>
                                                <button
                                                    onClick={() => handleBookClick(book)}
                                                    className='bg-slate-700 text-white rounded active:bg-slate-800 border mt-3 p-2 hover:scale-105'>
                                                    View Book Info
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                                {/*pages*/}
                                <div className="flex justify-center gap-4 p-1 mb-6">
                                    {startIndex > 0 && (
                                        <button
                                            onClick={() => search(null, Math.max(0, startIndex - maxResults))} disabled={startIndex === 0}
                                            className="bg-white text-white  p-3 rounded-full my-10 active:bg-slate-100"
                                        >
                                            <svg class="w-4 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                                            </svg>
                                        </button>
                                    )}
                                    <div className="flex items-center justify-center my-8">
                                        <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 text-base font-medium shadow-sm">
                                            {Math.floor(startIndex / maxResults) + 1}
                                        </span>
                                    </div>
                                    {books.length === maxResults && (
                                        <button
                                            onClick={() => search(null, startIndex + maxResults)} disabled={books.length < maxResults}
                                            className="bg-white text-white p-3 rounded-full my-10 active:bg-slate-100"

                                        >
                                            <svg class="w-4 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className=' flex justify-center p-5 gap-5'>
                                {/* <p className='text-2xl text-bold shadow shadow-emerald-600 rounded-lg p-5 text-black'>REQUESTED BOOK INFORMATION SHALL BE DISPLAYED HERE</p> */}
                                {/* <img className="rounded w-1/2 h-1/2"src="https://png.pngtree.com/png-clipart/20240508/original/pngtree-taking-books-from-library-flat-png-image_15043940.png"></img> */}
                            </div>
                        )}
                </div>
                {/*Book click popup*/}
                {selectedBook && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

                        <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 max-h-[80vh] overflow-y-auto">
                            <button
                                onClick={closePopup}
                                className="bg-white  rounded-full active:bg-slate-100  text-black my-2  p-4"
                            ><svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                </svg>

                            </button>
                            <h2 className="text-2xl text-center font-bold mb-4">
                                {selectedBook.volumeInfo.title}
                            </h2>
                            <div className="flex justify-center">
                                <img src={
                                    selectedBook.volumeInfo.imageLinks?.thumbnail ||
                                    'https://via.placeholder.com/150'} alt={selectedBook.volumeInfo.title} className='rounded-md shadow max-h-40 object-contain'></img>
                            </div>
                            <hr className='my-5' />
                            <p>
                                <strong>Author(s):</strong>{" "}
                                {selectedBook.volumeInfo.authors?.join(", ") || "Unknown"}
                            </p>
                            <p>
                                <strong>Publisher:</strong>{" "}
                                {selectedBook.volumeInfo.publisher || "N/A"}
                            </p>
                            <p>
                                <strong>Published Date:</strong>{" "}
                                {selectedBook.volumeInfo.publishedDate || "N/A"}
                            </p>
                            {selectedBook.volumeInfo.industryIdentifiers && (
                                <p>
                                    <strong>ISBN:</strong>{" "}
                                    {Isbn(selectedBook).isbn10 || Isbn(selectedBook).isbn13}
                                </p>
                            )}
                            <p>
                                <strong>Length:</strong>{" "}
                                {selectedBook.volumeInfo.pageCount + " pages" || "Length is not available"}
                            </p>
                            <p className='text-justify'>
                                <strong >Description:</strong>{" "}
                                {selectedBook.volumeInfo.description || "No description available."}
                            </p>
                            <p>
                                <strong>Categories:</strong>{" "}
                                {selectedBook.volumeInfo.categories?.join(", ") || "N/A"}
                            </p>
                            <div id="vividbookinfo" className='flex justify-center gap-4 m-1'>
                                {selectedBook.previewLink ? (
                                    <button className='g-white rounded active:bg-slate-100 border shadow mt-3 p-2 hover:scale-105'>
                                        <a
                                            href={selectedBook.volumeInfo.previewLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white"
                                        >
                                            Preview
                                        </a></button>) : (
                                            
                                    <button className='bg-white rounded active:bg-slate-100 border shadow mt-3 p-2 hover:scale-105'>
                                        <a
                                            href={selectedBook.volumeInfo.infoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-black"
                                        >
                                            Learn More
                                        </a></button>
                                )}
                                {selectedBook.infoLink && selectedBook.previewLink &&
                                    selectedBook.infoLink !== selectedBook.previewLink && (
                                        <button className='bg-white rounded active:bg-yellow-100 border shadow mt-3 p-2 hover:scale-105'>
                                            <a
                                                href={selectedBook.volumeInfo.infoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-black"
                                            >
                                                Learn More
                                            </a></button>)}
                                {/* Add to Favorites Button */}
                                {/* <button
                                    onClick={() => addToFavorites(selectedBook)}  // Call function to save book to localStorage
                                    className='bg-purple-600 rounded active:bg-purple-400 border mt-3 p-2'>
                                    Add to Favorites
                                </button> */}

                            </div>

                            {selectedBook.volumeInfo.title && (
                                <div id="amazonflipkartlink" className='flex justify-center gap-4 my-2'>
                                    <button className='bg-yellow-600 rounded active:bg-yellow-400 border mt-3 p-2 hover:scale-105'>
                                        <a href={`https://www.amazon.com/s?k=${encodeURIComponent(selectedBook.volumeInfo.title)}`}
                                            className='text-white'
                                            target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
                                    </button>

                                    <button className='bg-blue-600 rounded active:bg-blue-400 border mt-3 p-2 hover:scale-105'>
                                        <a href={`https://www.flipkart.com/search?q=${encodeURIComponent(selectedBook.volumeInfo.title)}`}
                                            className='text-white'
                                            target="_blank" rel="noopener noreferrer">Buy on Flipkart</a>
                                    </button>
                                </div>)}


                        </div>
                    </div>
                )}



            </div>

        </>
    )
}

export default Home;