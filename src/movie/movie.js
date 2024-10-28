import React, { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]); // 영화와 장르 정보를 저장할 상태
  const [latesMovie, setLatestMovie] = useState([]); // 최신 영화를 저장할 상태
  const [tvProgram, setTVProgram] = useState([]); // tv 프로그램 저장할 상태

  // 인기영화, tv프로그램, 최신영화
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // 장르 정보 가져오기
        const genreResponse = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=5bcbe438deafd116de4c935da4564925');
        const genreData = await genreResponse.json();
        const genres = genreData.genres;

        

        // 인기 영화 가져오기
        const movieResponse = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=5bcbe438deafd116de4c935da4564925');
        const movieData = await movieResponse.json();
        // 영화 데이터에 장르 이름을 매핑
        const moviesGenres = movieData.results.map(movie => {
        const movieGenres = movie.genre_ids.map(id => {
        const genre = genres.find(g => g.id === id);
                return genre ? genre.name : "Unknown";
            });
            return {
                ...movie,
                genres: movieGenres
            };
        });
        setMovies(moviesGenres);


        // 최신 영화 가져오기
        const latesMovie = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=5bcbe438deafd116de4c935da4564925');
        const latesMovieData = await latesMovie.json();
        const latesMovieGenres = latesMovieData.results.map(movie=>({ ...movie, 
            genres: movie.genre_ids.map(id=> genres.find(g=>g.id === id)?.name || "Unknown")}));
        setLatestMovie(latesMovieGenres);
        

        
      } catch (error) {
        console.error("Error fetching movies and genres:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
        <div className='movie-list'>
            <h1>인기 영화</h1>
                {movies.map(movie => (
                <div key={movie.id} className='movie-card'>
                    <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>평점 : {movie.vote_average}</p>
                    <p>개봉일 : {movie.release_date}</p>
                    <ul>
                        {movie.genres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                        ))}
                    </ul>
                </div>
    ))}
        </div>
        <div className='movie-list'>
            <h1>최신 영화</h1>
                {latesMovie.map(movie => (
                    <div key={movie.id} className='movie-card'>
                        <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title}/>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <p>평점 : {movie.vote_average}</p>
                        <p>개봉일 : {movie.release_date}</p>
                        <ul>
                        {movie.genres.map((genre, index) => (
                            <li key={index}>{genre}</li>
                        ))}
                        </ul>
                    </div>
                ))}
        </div>
    </div>
  );
}

export default MovieList;
