import PropTypes from "prop-types";

function Movie({poster_path, title, overview, genre_ids, id}) {
    return (
        <div>
            <img src={"https://image.tmdb.org/t/p/w200" + poster_path} alt={title}/>
            <h2>{title}</h2>
            <p>{overview}</p>
            <ul>{genre_ids.map((genre) => (<li key={genre}>{genre}</li>))}</ul>
        </div>
    );
}

export default Movie;