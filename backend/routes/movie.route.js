import express from 'express';
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovie, getTrending } from '../controllers/movie.controller.js';

const router = express.Router();


router.get("/trending", getTrending)

router.get("/:id/trailers", getMovieTrailers)

router.get("/:id/details", getMovieDetails)

router.get("/:id/similar", getSimilarMovie)

router.get("/:category", getMoviesByCategory)



export default router;