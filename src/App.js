import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import MovieList from './movie';
import Popular from './popular';
import Login from './login';
import Signup from './signup';

function WishList() {
  return null; // WishList 컴포넌트 구현 필요
}

function Search() {
  return null; // Search 컴포넌트 구현 필요
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인
  const checkLoginStatus = () => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    setIsLoggedIn(isLogin);
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLoginStatus();
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
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
