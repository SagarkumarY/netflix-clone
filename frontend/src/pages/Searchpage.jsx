// import React, { useState } from "react";
// import { useContentStore } from "../store/content";
// import Navbar from "../components/Navbar";

// function Searchpage() {
//   const [activeTab, setActiveTab] = useState("movie");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);

//   const { setContentType } = useContentStore();

//   // handle tab click
//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     tab === "movie" ? setContentType("movie") : setContentType("tv");
//     setResults([]);
//   };
//   return (
//     <div className="bg-black min-h-screen text-white">
//       <Navbar />

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center  gap-3 mb-4  transition-all duration-300">
//           <button
//             className={`
//                 py-2 px-4 rounded transition-all duration-300  ${
//                   activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
//                 } hover:bg-red-700
//                 `}
//             onClick={() => handleTabClick("movie")}
//           >
//             Movies
//           </button>

//           <button
//             className={`
//                 py-2 px-4 rounded transition-all duration-100  ${
//                   activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
//                 } hover:bg-red-700
//                 `}
//             onClick={() => handleTabClick("tv")}
//           >
//             TV Shows
//           </button>

//           <button
//             className={`
//                 py-2 px-4 rounded transition-all duration-300   ${
//                   activeTab === "person" ? "bg-red-600" : "bg-gray-800"
//                 } hover:bg-red-700
//                 `}
//             onClick={() => handleTabClick("person")}
//           >
//             Person
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Searchpage;

import React, { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

// Array of tabs with labels and corresponding values
const TABS = [
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
  { label: "Person", value: "person" },
];

// TabButton component for rendering each tab button
function TabButton({ tab, activeTab, onClick }) {
  // Check if the current tab is active
  const isActive = activeTab === tab.value;

  return (
    <button
      // Apply dynamic styling based on whether the tab is active
      className={`py-2 px-4 rounded transition-all duration-300 ${
        isActive ? "bg-red-600" : "bg-gray-800"
      } hover:bg-red-700`}
      onClick={() => onClick(tab.value)} // Handle click event
      aria-label={tab.label} // Accessibility: screen reader label
    >
      {tab.label}
    </button>
  );
}

// Main component for the search page
function Searchpage() {
  // State to manage the currently active tab
  const [activeTab, setActiveTab] = useState("movie");

  // State to manage the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // State to manage the search results
  const [results, setResults] = useState([]);

  // Get the setContentType function from the content store
  const { setContentType } = useContentStore();

  // Function to handle when a tab is clicked
  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue); // Set the active tab
    setContentType(tabValue); // Update the content type in the store
    setResults([]); // Clear previous search results
  };

  // Function to handle search action (implementation needed)
  const handleSearch = async (e) => {
    // Implement the search functionality based on searchTerm and activeTab
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content); // Set the search results in the state
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found , make sure you are searching under the right category"
        );
      } else {
        toast.error(
          "An error occurred while fetching data, please try again later"
        );
      }
    }
  };



  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar /> {/* Render the navigation bar */}
      <div className="container mx-auto px-4 py-8">
        {/* Tab buttons */}
        <div className="flex justify-center gap-3 mb-4">
          {TABS.map((tab) => (
            <TabButton
              key={tab.value} // Unique key for each tab button
              tab={tab} // Pass tab data to TabButton component
              activeTab={activeTab} // Pass the currently active tab
              onClick={handleTabClick} // Pass the click handler
            />
          ))}
        </div>

        {/* Search input and button */}

        <form
          onSubmit={handleSearch}
          className="flex gap-3 items-stretch mb-8 max-w-2xl mx-auto"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={" Search for a " + activeTab}
            className=" w-full p-2 rounded bg-gray-800 text-white"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
          >
            <Search className=" size-6" />
          </button>
        </form>
        {/* Render search results here */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div className=" bg-gray-800 p-4 rounded" key={result.id}>
                {activeTab === "person" ? (
                  <Link
                    to={"/actor/" + result.name}
                    className=" flex flex-col items-center"
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL +  result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                ) : (
                  <Link to={"/watch/" + result.id } onClick={()=>setContentType(activeTab)}>
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Searchpage;
