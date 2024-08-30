import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js"



export async function searchPerson(req, res) {
    const { query } = req.params
    try {

        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);


        if (response.results.length === 0) {
            return res.status(404).json({ message: "No results found" })
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({ status: true, content: response.results })

    } catch (error) {
        console.error("Error searching person", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
};


export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).json({ message: "No results found" })
        }


        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({ status: true, content: response.results })

    } catch (error) {
        console.error("Error searching movie", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
};


export async function searchTv(req, res) {
    const { query } = req.params;
    try {

        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).json({ message: "No results found" })
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                },
            },
        });

        res.status(200).json({ status: true, content: response.results })

    } catch (error) {
        console.error("Error searching tv", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
};


export async function getSearchHistory(req, res) {
    try {
        // Find the user by their ID (assumed to be in req.user._id)
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // Return the searchHistory array
        res.status(200).json({ success: true, searchHistory: user.searchHistory });
    } catch (error) {
        console.error("Error fetching search history", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}



export async function removeItemFromSearchHistory(req, res) {
    const { id } = req.params;
    const numericId = Number(id); // Convert the id to a number if needed

    try {
        // Step 1: Find the user by ID
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Step 2: Check if the searchHistory contains an item with the given id
        const itemExists = user.searchHistory.some(item => item.id === numericId);

        if (!itemExists) {
            return res.status(404).json({ success: false, message: "Item not found in search history" });
        }

        // Step 3: Remove the item from searchHistory
        user.searchHistory = user.searchHistory.filter(item => item.id !== numericId);

        // Save the updated user document
        await user.save();

        res.status(200).json({ success: true, message: "Item removed successfully", searchHistory: user.searchHistory });

    } catch (error) {
        console.error("Error removing item from search history", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

