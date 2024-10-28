import PropTypes from "prop-types";

function Movie({poster_path, title, overview, genre_ids, id, vote_average, release_date}) {
    return (
        <div>
            <img src={"https://image.tmdb.org/t/p/w200" + poster_path} alt={title}/>
            <h2>{title}</h2>
            <p>{overview}</p>
            <p>평점 : {vote_average}</p>
            <p>개봉일 : {release_date}</p>
        </div>
    );
}

export default Movie;