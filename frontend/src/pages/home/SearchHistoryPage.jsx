import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Loader, Trash } from "lucide-react";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";

// Utility function to format the date from the input date string
function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()]; // Get the month name
  const day = date.getUTCDate(); // Get the day of the month
  const year = date.getUTCFullYear(); // Get the year

  return `${month} ${day}, ${year}`; // Return formatted date
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function SearchHistoryPage() {
  const [searchHistory, setSearchHistory] = useState([]); // State for search history
  const [loading, setLoading] = useState(true); // State for loading

  const [deletingId, setDeletingId] = useState(null); // State to track the item being deleted

  // Fetch search history on component mount
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.searchHistory); // Set fetched search history
      } catch (error) {
        console.error("Error fetching search history:", error);
        setSearchHistory([]); // Set to empty array if error occurs
      } finally {
        setLoading(false); // End loading state
      }
    };

    getSearchHistory(); // Call the function to fetch search history
  }, []);

  // Delete function
  const handleDelete = async (entry) => {
    setDeletingId(entry.id); // Set the ID of the item being deleted
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id)); // Update the search history state
      toast.success("Search history deleted successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("failed to delete search history");
    } finally {
      setDeletingId(null); // Reset the deleting state
    }
  };

  // If loading, show the loader
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        <Loader className="animate-spin w-16 h-16 text-red-600" />
      </div>
    );
  };

  // If search history is empty, show a message
  if (searchHistory.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  };

  // Main content rendering search history
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {searchHistory.map((entry, index) => (
            <div
              className="bg-gray-800 p-4 rounded flex items-start"
              key={index}
            >
              {/* Display the image of the search entry */}
              <img
                // src={SMALL_IMG_BASE_URL + entry.image || "/not-found-img.jpeg"}
                src={
                  entry.image
                    ? SMALL_IMG_BASE_URL + entry.image
                    : "/not-found-img.jpeg"
                }
                alt={"History img"}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold">{entry.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatDate(entry.createdAt)}
                </span>
              </div>
              {/* Display the type of search (Movie, TV Show, Person) */}
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-red-600"
                    : entry.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {capitalizeFirstLetter(entry.searchType)}
              </span>

              {/* Show loader while deleting */}
              {deletingId === entry.id ? (
                <Loader className="animate-spin w-5 h-5 ml-4 text-red-600" />
              ) : (
                <Trash
                  className="w-5 h-5 ml-4 hover:fill-red-600 hover:text-red-600 cursor-pointer"
                  onClick={() => handleDelete(entry)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchHistoryPage;
