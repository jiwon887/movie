import React, { useEffect, useState } from 'react';

function WishList() {
  const [gridMovies, setGridMovies] = useState([]); // Grid View 영화 목록
  const [tableMovies, setTableMovies] = useState([]); // Table View 영화 목록
  const [gridPage, setGridPage] = useState(1); // Grid View 현재 페이지
  const [tablePage, setTablePage] = useState(1); // Table View 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [isGridView, setIsGridView] = useState(true); // 그리드 뷰 여부
  const [loading, setLoading] = useState(false); // 로딩 상태
  const userID = window.localStorage.getItem("savedID");

  useEffect(() => {
    // 로컬 스토리지에서 사용자 ID별 위시리스트 가져오기
    const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${userID}`)) || [];
    setGridMovies(savedWishlist);
    setTotalPages(Math.ceil(savedWishlist.length / 5)); // 5개씩 표시할 경우 총 페이지 계산
  }, [userID]);

  // Grid View 무한 스크롤
  useEffect(() => {
    if (isGridView) {
      loadMovies(gridPage, true);
    }
  }, [gridPage]);

  // Table View 페이지네이션
  useEffect(() => {
    if (!isGridView) {
      loadMovies(tablePage, false);
    }
  }, [tablePage, isGridView]);

  // 현재 페이지에 해당하는 영화 목록 가져오기
  const loadMovies = (page, isGrid) => {
    const start = (page - 1) * 5;
    const end = start + 5;
    const movies = gridMovies.slice(start, end);

    if (isGrid) {
      setGridMovies(prevMovies => [...prevMovies, ...movies]); // Grid View: 기존 영화 목록에 추가
    } else {
      setTableMovies(movies); // Table View: 새 페이지의 영화 목록으로 덮어쓰기
    }
  };

  // 스크롤 이벤트 처리
  const handleScroll = () => {
    if (isGridView && !loading && gridPage < totalPages) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setGridPage(prev => prev + 1); // 다음 페이지로 이동
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [gridPage, loading, isGridView]);

  // 뷰 타입 전환
  const handleViewChange = () => {
    setIsGridView(prev => !prev);
    if (!isGridView && tablePage === 1) loadMovies(1, false); // TableView로 전환 시 첫 페이지 로드
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

  // 위시리스트 추가/삭제
  const toggleWishlist = (movie) => {
    let userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userID}`)) || [];
    const movieIndex = userWishlist.findIndex(item => item.id === movie.id);

    if (movieIndex !== -1) {
      userWishlist.splice(movieIndex, 1);
    } else {
      userWishlist.push(movie);
    }

    setGridMovies(userWishlist);
    localStorage.setItem(`wishlist_${userID}`, JSON.stringify(userWishlist));
  };

  return (
    <div>
      <h1 align='center'>My Wishlist</h1>
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
              <button className='wishlist-button' onClick={() => toggleWishlist(movie)}>
                {gridMovies.some(item => item.id === movie.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          ))}
          {loading && <p>Loading...</p>}
        </div>
      ) : (
        <div className='table-view'>
          <table className='movie-card'>
            <thead>
              <tr>
                <th>포스터</th>
                <th>제목</th>
                <th>평점</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {tableMovies.map(movie => (
                <tr key={movie.id}>
                  <td>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.vote_average}</td>
                  <td>
                    <button className='wishlist-button' onClick={() => toggleWishlist(movie)}>
                      {gridMovies.some(item => item.id === movie.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

export default WishList;
