import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("release_date.desc");
  const [selectedGenre, setSelectedGenre] = useState(null); 
  const [minRating, setMinRating] = useState(0); 
  const [releaseYear, setReleaseYear] = useState(null);

  const apiKey = window.localStorage.getItem("savedPassword");

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ko`
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMovies = async (pageNumber = 1) => {
    const genreFilter = selectedGenre ? `&with_genres=${selectedGenre}` : "";
    const ratingFilter = minRating ? `&vote_average.gte=${minRating}` : "";
    const sortFilter = `&sort_by=${sort}`;
    const yearFilter = releaseYear ? `&primary_release_year=${releaseYear}` : "";

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko-KR&page=${pageNumber}${genreFilter}${ratingFilter}${sortFilter}${yearFilter}`
      );
      const data = await response.json();

      setMovies((prevMovies) => (pageNumber === 1 ? data.results : [...prevMovies, ...data.results]));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };


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
  }, []);


  useEffect(() => {
    fetchMovies(page);
  }, [page]);


  useEffect(() => {
    setPage(1);
    setMovies([]);
    fetchMovies(1);
  }, [selectedGenre, minRating, releaseYear, sort]);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map(id => genres.find(g => g.id === id)?.name || '알 수 없음')
      .join(', ');
  };

  return (
    <div>
      <h1 className='section-title' align='center'>검색</h1>
      <div className='filters'>
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
        <select onChange={(e) => setMinRating(Number(e.target.value))} value={minRating}>
          <option value={0}>모든 평점</option>
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
          min="1980"
          max="2024"
          onChange={(e) => setReleaseYear(Number(e.target.value))}
          placeholder="2023"
        />
      </label>
      <label>
        정렬:
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="release_date.desc">최신 개봉 순</option>
          <option value="release_date.asc">오래된 개봉 순</option>
          <option value="vote_average.desc">평점 높은 순</option>
          <option value="vote_average.asc">평점 낮은 순</option>
          <option value="popularity.desc">인기 높은 순</option>
          <option value="popularity.asc">인기 낮은 순</option>
        </select>
      </label>
      </div>
    <div className='grid-view'>
        {movies.map((movie) => (
          <div className='movie-card  ' key={movie.id}>
            {movie.poster_path ?(
             <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            ) : (
            <div style={{ width: "176px", height: "264px", backgroundColor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>
              이미지 없음
            </div>
          )}
            <strong>{movie.title}</strong><br />
            <strong>장르:</strong> {getGenreNames(movie.genre_ids)}<br />
            <strong>개봉일:</strong> {movie.release_date}<br />
            <strong>평점:</strong> {movie.vote_average}
          </div>
        ))}
    </div>
      <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑ 맨 위로
      </button>
  </div>
  );
};

export default MovieList;
