import React, { useState, useEffect, useRef } from "react";

function Search() {
  const [movies, setMovies] = useState([]); // 영화 데이터
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [query, setQuery] = useState(""); // API 호출 시 사용할 검색어
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [loading, setLoading] = useState(false); // 로딩 상태
  const observerRef = useRef(null); // IntersectionObserver 참조
  const [searchHistory, setSearchHistory] = useState([]); // 검색 기록
  const [filteredHistory, setFilteredHistory] = useState([]); // 필터링된 검색 기록
  const apiKey = window.localStorage.getItem("savedPassword"); // API 키 가져오기
  const userID = window.sessionStorage.getItem("curUserID"); // 사용자 ID 가져오기

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // 검색 기록 필터링
    if (term.trim() !== "") {
      const filtered = searchHistory.filter((history) =>
        history.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory([]);
    }
  };

  // 검색 버튼 클릭 핸들러
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      setMovies([]); 
      setPage(1); 
      saveSearchTerm(searchTerm); 
      setFilteredHistory([]); 
      fetchMovies(searchTerm, 1); 
    }
  };

  // 검색 기록 저장
  const saveSearchTerm = (term) => {
    const storedHistory = JSON.parse(localStorage.getItem(`searchTerm_${userID}`)) || [];
    const updatedHistory = [...new Set([term, ...storedHistory])]; // 중복 제거
    localStorage.setItem(`searchTerm_${userID}`, JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  // 검색 기록 불러오기
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem(`searchTerm_${userID}`)) || [];
    setSearchHistory(storedHistory);
  }, [userID]);

  // 영화 데이터 가져오기
  const fetchMovies = async (query, pageNumber) => {
    const apiUrl = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${pageNumber}&language=ko`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNumber}&language=ko`; // 검색어가 없을 경우 인기 영화 목록 가져오기

    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지가 변경되었을 때 추가 영화 데이터 가져오기
  useEffect(() => {
    if (page > 1) {
      fetchMovies(query, page);
    }
  }, [page]);

  

  // 무한 스크롤
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && !loading && page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0 }
    );

    const observer = observerRef.current;
    const target = document.querySelector("#loadMore");

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loading, page, totalPages]);

  return (
    <div>
      <h1 className="section-title" align="center">영화 검색</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          type="button"
          className="search-button"
          onClick={handleSearchSubmit}
        >
          검색
        </button>
        {filteredHistory.length > 0 && (
          <ul className="autocomplete-list">
            {filteredHistory.map((history, index) => (
              <li
                key={index}
                className="autocomplete-item"
                onClick={() => {
                  setSearchTerm(history);
                  setFilteredHistory([]); // 자동완성 목록 닫기
                }}
              >
                {history}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid-view">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/200x300"
              }
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>평점: {movie.vote_average}</p>
            <p>개봉일: {movie.release_date}</p>
          </div>
        ))}
      </div>
      {loading && <p className="loading-overlay">loading...</p>}
      <div id="loadMore" style={{ height: "10px" }} />
    </div>
  );
}

export default Search;
