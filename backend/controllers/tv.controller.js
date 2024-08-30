
import { fetchFromTMDB } from '../services/tmdb.service.js'


export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];


        res.json({ status: true, content: randomMovie })

    } catch (error) {
        console.error("Error fetching trending tv", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
};


export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

        res.json({ status: true, trailers: data.results })

    } catch (error) {

        if (error.message.includes("404")) {
            return res.status(404).json({ status: false, message: "Movie not found" })  // movie not foundf
        }
        console.error("Error fetching tv trailers", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
};



// Get Movie Details function 
export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

        res.json({ status: true, movie: data })

    } catch (error) {

        if (error.message.includes("404")) {
            return res.status(404).json({ status: false, message: "Movie not found" })  // movie not found
        }
        console.error("Error fetching tv details", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
};


export async function getSimilarTvs(req, res) {

    const { id } = req.params;

    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

        res.json({ status: true, similarMovies: data.results })

    } catch (error) {
        console.error("Error fetching similar tv", error.message);
        res.status(500).json({ status: false, message: "Server Error" })

    }
};


export async function getTvsByCategory(req, res) {
    const { category } = req.params;

    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

        res.json({ status: true, content: data.results })

    } catch (error) {
        console.error("Error fetching Tvs by category", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }


};