import './App.css';
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import homelog from './homelog.png'; 

import MovieList from './movie';
import Popular from './popular';
import Login from './login';
import Signup from './signup';
import WishList from './wishlist';

function Search() {
  return null; // Search 컴포넌트 구현 필요
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태 추가

  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    setIsLoggedIn(isLogin);
    setIsLoading(false); // 로딩 완료 상태로 전환
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLoginStatus(); // 초기 렌더링 시 로그인 상태 확인
  }, []);

  // 로딩 중일 때 로딩 표시를 추가할 수도 있음
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Nav className='navbar' activeKey="/">
          <Link to="/" className="logo">
            <img src={homelog} alt="Nav logo" className='logo-img'/>
          </Link>
          <Nav.Item className='nav-item'>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item className='nav-item'>
            <Nav.Link as={Link} to="/wishlist">WishList</Nav.Link>
          </Nav.Item>
          <Nav.Item className='nav-item'>
            <Nav.Link as={Link} to="/movie/popular">Popular</Nav.Link>
          </Nav.Item>
          <Nav.Item className='nav-item'>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
          </Nav.Item>
          {isLoggedIn && (
            <Nav.Item className='nav-item'>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </Nav.Item>
          )}
        </Nav>
        <Routes>
          <Route path='/' element={isLoggedIn ? <MovieList /> : <Navigate to="/login" />} />
          <Route path='/wishlist' element={isLoggedIn ? <WishList /> : <Navigate to="/login" />} />
          <Route path='/movie/popular' element={isLoggedIn ? <Popular /> : <Navigate to="/login" />} />
          <Route path='/search' element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
          <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/signup' element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
