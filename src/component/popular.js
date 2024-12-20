import React, { useEffect, useState, useRef } from 'react';


function Popular() {
  const [gridMovies, setGridMovies] = useState([]); // Grid View 영화 목록
  const [tableMovies, setTableMovies] = useState([]); // Table View 영화 목록
  const [gridPage, setGridPage] = useState(1); // Grid View 현재 페이지
  const [tablePage, setTablePage] = useState(1); // Table View 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [isGridView, setIsGridView] = useState(true); // 그리드 뷰 여부
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [wishlist, setWishlist] = useState([]); // 위시리스트 반영
  const observerRef = useRef(null);
  const apiKey = window.localStorage.getItem("savedPassword");
  const userID = window.localStorage.getItem("savedID");

  // 영화 데이터 가져오기
  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}&language=ko`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loadMovies = async (page, isGrid) => {
    const data = await fetchMovies(page);
    if (data) {
      if (isGrid) {
        setGridMovies(prevMovies => [...prevMovies, ...data.results]); // Grid View: 기존 영화 목록에 추가
      } else {
        setTableMovies(data.results); // Table View: 새 페이지의 영화 목록으로 덮어쓰기
      }
      setTotalPages(data.total_pages); // 총 페이지 수 설정
    }
  };

  // Grid View 무한 스크롤
  useEffect(() => {
    if (isGridView) {
      loadMovies(gridPage, true);
    }
  }, [gridPage, isGridView]);

  // Table View 페이지네이션
  useEffect(() => {
    if (!isGridView) {
      loadMovies(tablePage, false);
    }
  }, [tablePage, isGridView]); 

  // 스크롤 이벤트 처리
  useEffect(() => {
    // 마지막 요소가 뷰포트에 들어왔는지 관찰
    observerRef.current = new IntersectionObserver(entries => {
      const lastEntry = entries[0];
      if (lastEntry.isIntersecting && !loading && gridPage <= totalPages) {
        setGridPage(prevPage => {
        const nextPage = prevPage + 1;
        return nextPage;
      });
      }
    }, { threshold: 0 }); 

    const observer = observerRef.current;
    const target = document.querySelector("#loadMore");

    // 타겟 요소를 관찰
    if (target) {
      observer.observe(target);
    }

    // 컴포넌트 언마운트 시 관찰 해제
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loading, gridPage, totalPages]);

  // 뷰 타입 전환
  const handleViewChange = () => {
    setIsGridView(prev => !prev);
    if (!isGridView && tablePage === 1) loadMovies(1, false); // tableView로 전환 시 첫 페이지 로드
  };

  // Table View 페이지네이션 버튼 핸들러
  const handleNextPage = () => {
    if (tablePage < totalPages) {
      setTablePage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (tablePage > 1) {
      setTablePage(prevPage => prevPage - 1);
    }
  };

  // 위시리스트 상태 로드
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userID}`)) || [];
    setWishlist(savedWishlist);
  }, [userID]);

 // 위시리스트 추가하기
  const addWishlist = (movie) => {
    let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userID}`)) || [];
    const movieIndex = userWishlist.findIndex(item => item.id === movie.id);
  
    if (movieIndex !== -1) {
      userWishlist.splice(movieIndex, 1);
    } else {
      userWishlist.push(movie);
    }

    setWishlist(userWishlist);
    localStorage.setItem(`wishlist_${userID}`, JSON.stringify(userWishlist));
  };
  

  return (
    <div>
      <h1 className='section-title' align='center'>대세 콘텐츠</h1>
      <button className='view-selector' onClick={handleViewChange}>
        {isGridView ? '테이블 보기' : '그리드 보기'}
      </button>

      {isGridView ? (
        <div className="grid-view">
          {gridMovies.map(movie => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>평점: {movie.vote_average}</p>
              <button className='wishlist-button' onClick={() => addWishlist(movie)}>
                          {JSON.parse(localStorage.getItem(`wishlist_${userID}`))?.some(item => item.id === movie.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
              </button>
              <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    ↑ 맨 위로
              </button>
            </div>
          ))}
          {loading && <p className='loading-overlay'>Loading...</p>}
          <div id="loadMore" style={{ height: "10px" }} />
        </div>
      ) : (
        <div className='table-view'>
          <div>
            <table className='movie-card'>
              <thead>
                <tr>
                  <th>포스터</th>
                  <th className="movie-title">제목</th>
                  <th>평점</th>
                  <th>개봉일</th>
                  <th>위시리스트</th>
                </tr>
              </thead>
              <tbody>
                {tableMovies.slice(0, 4).map(movie => (
                  <tr key={movie.id}>
                    <td>
                      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    </td>
                    <td className="movie-title">{movie.title}</td>
                    <td className="movie-rating">{movie.vote_average}</td>
                    <td>{movie.release_date}</td>
                    <td>
                      <button className='wishlist-button' onClick={() => addWishlist(movie)}>
                          {JSON.parse(localStorage.getItem(`wishlist_${userID}`))?.some(item => item.id === movie.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                   </button>
                   </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={tablePage === 1}>이전 페이지</button>
            <span>현재 페이지: {tablePage} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={tablePage === totalPages}>다음 페이지</button>
          </div>
        </div>
      )}
    </div>


  );
}

export default Popular;
