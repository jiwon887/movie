import React, { useEffect, useState } from 'react';

function Popular() {
  const [gridMovies, setGridMovies] = useState([]); // Grid View 영화 목록
  const [tableMovies, setTableMovies] = useState([]); // Table View 영화 목록
  const [gridPage, setGridPage] = useState(1); // Grid View 현재 페이지
  const [tablePage, setTablePage] = useState(1); // Table View 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [isGridView, setIsGridView] = useState(true); // 그리드 뷰 여부
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 영화 데이터 가져오기
  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5bcbe438deafd116de4c935da4564925&page=${page}`);
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
  }, [gridPage]);

  // Table View 페이지네이션
  useEffect(() => {
    if (!isGridView) {
      loadMovies(tablePage, false);
    }
  }, [tablePage]);

  // 스크롤 이벤트 처리 (Grid View 전용)
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
    setIsGridView(prev => !prev); // 뷰 타입 전환
  };

  // Table View 페이지네이션 버튼 핸들러
  const handleNextPage = () => {
    if (tablePage < totalPages) {
      setTablePage(prevPage => prevPage + 1); // Table View에서 다음 페이지로 이동
    }
  };

  const handlePrevPage = () => {
    if (tablePage > 1) {
      setTablePage(prevPage => prevPage - 1); // Table View에서 이전 페이지로 이동
    }
  };

  return (
    <div>
      <h1>대세 콘텐츠</h1>
      <button onClick={handleViewChange}>
        {isGridView ? '테이블 보기' : '그리드 보기'}
      </button>

      {isGridView ? (
        <div className="grid-view">
          {gridMovies.map(movie => (
            <div key={movie.id} className="grid-item">
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>평점: {movie.vote_average}</p>
              <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    ↑ 맨 위로
              </button>
            </div>
          ))}
          {loading && <p>Loading...</p>}
        </div>
      ) : (
        <div>
          <table className="table-view">
            <thead>
              <tr>
                <th>포스터</th>
                <th className="movie-title">제목</th>
                <th>평점</th>
                <th>개봉일</th>
              </tr>
            </thead>
            <tbody>
              {tableMovies.slice(0, 4).map(movie => ( // 4행까지만 표시
                <tr key={movie.id}>
                  <td>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                  </td>
                  <td className="movie-title">{movie.title}</td>
                  <td className="movie-rating">{movie.vote_average}</td>
                  <td>{movie.release_date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={handlePrevPage} disabled={tablePage === 1}>이전 페이지</button>
            <span>현재 페이지: {tablePage}</span>
            <button onClick={handleNextPage} disabled={tablePage === totalPages}>다음 페이지</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popular;
