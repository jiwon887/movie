import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import MovieList from './movie';
import Popular from './popular';
import Login from './login';

function WishList() {
  return null; // WishList 컴포넌트 구현 필요
}

function Search() {
  return null; // Search 컴포넌트 구현 필요
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 로그인 상태를 확인하는 함수
  const checkLoginStatus = () => {
    const loginID = sessionStorage.getItem("loginID");
    const loginPassword = sessionStorage.getItem("loginPassword");
    
    // 간단한 로그인 상태 확인 (조건은 필요에 따라 변경)
    if (loginID && loginPassword) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // 컴포넌트가 마운트될 때 로그인 상태 확인
  }, []);

  return (
    <Router>
      <div>
        <Nav className='navbar' activeKey="/">
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
        </Nav>
        <Routes>
          {/* 로그인 상태에 따라 리디렉션 처리 */}
          <Route path='/' element={isLoggedIn ? <MovieList /> : <Navigate to="/login" />} />
          <Route path='/wishlist' element={isLoggedIn ? <WishList /> : <Navigate to="/login" />} />
          <Route path='/movie/popular' element={isLoggedIn ? <Popular /> : <Navigate to="/login" />} />
          <Route path='/search' element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
          <Route path='/login' element={<Login />} /> {/* 로그인 컴포넌트 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
