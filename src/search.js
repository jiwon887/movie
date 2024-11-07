import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const apiKey = window.localStorage.getItem("savedPassword");

  // 장르 목록을 가져오는 함수
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ko`
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (err) {
      setError('장르 정보를 가져오는 데 실패했습니다.');
    }
  };

  // 영화 데이터를 가져오는 함수
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ko&page=1`
      );
      const data = await response.json();
      
      // 영화 데이터를 처리하여 필요한 정보만 추출
      const movieData = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        genres: movie.genre_ids,
        release_date: movie.release_date,
        rating: movie.vote_average,
      }));
      setMovies(movieData);
    } catch (err) {
      setError('영화 정보를 가져오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  return (
    <div/>
  );
};

export default MovieList;
