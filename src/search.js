import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);


  const [selectedGenre, setSelectedGenre] = useState(null); 
  const [minRating, setMinRating] = useState(0); 
  const [releaseYear, setReleaseYear] = useState(null);
  
  const apiKey = window.localStorage.getItem("savedPassword");

  // 장르 목록을 가져오는 함수
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ko`
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching movies and genres:", error);
    }
  };

  // 영화 데이터를 가져오는 함수
  const fetchMovies = async (pageNumber) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko&page=${pageNumber}`
      );
      const data = await response.json();
      
      // 영화 데이터를 처리하여 필요한 정보만 추출
      const movieData = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        genres: movie.genre_ids,
        release_date: movie.release_date,
        rating: movie.vote_average,
        poster_path: movie.poster_path
      }));
      setMovies(movieData);
    } catch (error) {
      console.error("Error fetching movies and genres:", error);
    }
  };



  // 스크롤 함수
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  

  useEffect(() => {
    fetchGenres();
    fetchMovies(page);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);


  // 필터링 함수
  const filterMovies = () => {
    return movies.filter((movie) => {
      const matchGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true;
      const matchRating = movie.rating >= minRating;
      const matchReleaseYear = releaseYear
        ? new Date(movie.release_date).getFullYear() === releaseYear
        : true;
      return matchGenre && matchRating && matchReleaseYear;
    });
  };

  // 장르명 가져오기
  const getGenreNames = (genreIds) => {
    return genreIds
      .map(id => genres.find(g => g.id === id)?.name || '알 수 없음')
      .join(', ');
  };
  



  return (
    <div>
        <label>
          장르:
          <select onChange={(e) => setSelectedGenre(Number(e.target.value))} value={selectedGenre || ''}>
            <option value="">모든 장르</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </label>
        <label>
          최소 별점:
          <select onChange={(e) =>setMinRating(e.target.value)}>
              <option value={minRating}></option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
          </select>
        </label>
        <label>
        개봉 연도:
        <input
          type="number"
          value={releaseYear || ''}
          min='1980'
          max='2024'
          onChange={(e) => setReleaseYear(Number(e.target.value))}
          placeholder="2023"
        />
      </label>

        <ul>
        {filterMovies().map((movie) => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <strong>{movie.title}</strong><br />
            <strong>장르:</strong> {getGenreNames(movie.genres)}<br />
            <strong>개봉일:</strong> {movie.release_date}<br />
            <strong>평점:</strong> {movie.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
