import React, { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]); // 영화와 장르 정보를 저장할 상태
  const [latesMovie, setLatestMovie] = useState([]); // 최신 영화를 저장할 상태
  const [tvProgram, setTVProgram] = useState([]); // tv 프로그램 저장할 상태
  const [animation, setAnimation] = useState([]); // animation 저장할 상태
  const [genres, setGenres] = useState([]); // 장르 전역 변수로 사용
  const [wishList, setWishList] = useState([]); // 위시리스트 반영
  const apiKey = window.localStorage.getItem("savedPassword");
  const userID = window.localStorage.getItem("savedID");

    // 인기영화, tv프로그램, 최신영화, 애니매이션
    useEffect(() => {
        const fetchMovies = async () => {
      try {
        // 장르 정보 가져오기
        const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        const genreData = await genreResponse.json();
        const genres = genreData.genres;

      

        // 인기 영화 가져오기
        const movies= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const movieData = await movies.json();
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
        const latesMovie = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
        const latesMovieData = await latesMovie.json();
        const latesMovieGenres = latesMovieData.results.map(movie=>({ ...movie, 
            genres: movie.genre_ids.map(id=> genres.find(g=>g.id === id)?.name || "Unknown")}));
        setLatestMovie(latesMovieGenres);
              
        
        // 애니메이션 가져오기
        const animation = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16`); // 16은 애니메이션 장르 ID
        const animationData = await animation.json();
        const animationGenres = animationData.results.map(movie => ({...movie,
            genres: movie.genre_ids.map(id => genres.find(g => g.id === id)?.name || "Unknown")
        }));
        setAnimation(animationGenres);
      } catch (error) {
        console.error("Error fetching movies and genres:", error);
      }
      
      

    } 

    fetchMovies();
  }, [apiKey]); // 유저 별 처리를 위해 추가

  // 위시리스트 로드
  useEffect(()=>{
    const savedWishList = JSON.parse(localStorage.getItem(`wishlist_${userID}`)) || [];
    setWishList(savedWishList);
  },[userID]);

// 위시리스트 추가
const addWishlist = (movie) => {
  let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userID}`)) || [];
  const movieIndex = userWishlist.findIndex(item => item.id === movie.id);

  if (movieIndex !== -1) {
    userWishlist.splice(movieIndex, 1);
    alert("remove wishlist.");
  } else {
    userWishlist.push(movie);
    alert("add wishlist.");
  }

  setWishList(userWishlist);
  localStorage.setItem(`wishlist_${userID}`, JSON.stringify(userWishlist));
};


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
                    <button onClick={() => addWishlist(movie)}>
                          {JSON.parse(localStorage.getItem(`wishlist_${userID}`))?.some(item => item.id === movie.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                        </button>
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
                        <button onClick={() => addWishlist(movie)}>
                          {JSON.parse(localStorage.getItem(`wishlist_${userID}`))?.some(item => item.id === movie.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                        </button>
                    </div>
                ))}

        </div>

        <div className='movie-list'>
          <h1>애니메이션</h1>
            {animation.map(movie => (
              <div key={movie.id} className='movie-card'>
                <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>평점 : {movie.vote_average}</p>
                <p>개봉일 : {movie.release_date}</p>
                <button onClick={() => addWishlist(movie)}>
                          {JSON.parse(localStorage.getItem(`wishlist_${userID}`))?.some(item => item.id === movie.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                        </button>
              </div>
        ))}
      </div>

    </div>
  );
}

export default MovieList;
