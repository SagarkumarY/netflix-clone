import { fetchFromTMDB } from '../services/tmdb.service.js'


export async function getTrending(req, res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];


        res.json({ status: true, content: randomMovie })

    } catch (error) {
        console.error("Error fetching trending movies", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
}


export async function getMovieTrailers(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

        res.json({ status: true, trailers: data.results })

    } catch (error) {

        if (error.message.includes("404")) {
            return res.status(404).json({ status: false, message: "Movie not found" })  // movie not foundf
        }
        console.error("Error fetching movie trailers", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
}



// Get Movie Details function 
export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

        res.json({ status: true, content: data })

    } catch (error) {

        if (error.message.includes("404")) {
            return res.status(404).json({ status: false, message: "Movie not found" })  // movie not found
        }
        console.error("Error fetching movie details", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }
}


export async function getSimilarMovie(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);

        res.json({ status: true, similarMovies: data.results })

    } catch (error) {
        console.error("Error fetching similar movies", error.message);
        res.status(500).json({ status: false, message: "Server Error" })

    }
};


export async function getMoviesByCategory(req, res) {
    const { category } = req.params;

    try {

        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);

        res.json({ status: true, content: data.results })

    } catch (error) {
        console.error("Error fetching movies by category", error.message);
        res.status(500).json({ status: false, message: "Server Error" })
    }


}