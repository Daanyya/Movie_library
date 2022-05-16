import Movie from "../src/movie.js";

export default function fast_add_movie(set_movie_info) {

    var movie = new Movie({
        poster: 'default',
        name: set_movie_info.name,
        date: set_movie_info.date,
        country: set_movie_info.country,
        genre: set_movie_info.genre,
        director: set_movie_info.director,
        scenario: set_movie_info.scenario,
        producer: set_movie_info.producer,
        operator: set_movie_info.operator,
        composer: set_movie_info.composer,
        budget: set_movie_info.budget,
        fees: set_movie_info.fees,
        rating: set_movie_info.rating,
        time: set_movie_info.time
    });

    localStorage.setItem(set_movie_info.name.toLowerCase() + '_movie', JSON.stringify(movie));
    localStorage.setItem(set_movie_info.name.toLowerCase() + '_poster', set_movie_info.poster);
}