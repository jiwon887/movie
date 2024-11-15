import './App.css';
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Nav from 'react-bootstrap/Nav';
import homelog from './homelog.png'; 

import MovieList from './component/movie';
import Popular from './component/popular';
import Login from './component/login';
import Signup from './component/signup';
import WishList from './component/wishlist';
import Search from './component/search';
import Filter from './component/filter'

const pageOrder = {
  '/': 1,              // Home
  '/wishlist': 2,      // WishList
  '/popular': 3,        // Popular
  '/search': 4,         // Search
  '/filter': 5,         // filter
  '/login': 6,          // login
  '/signup': 7          // signup
};

function AnimatedRoutes({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

  // 이전 페이지와 현재 페이지 비교해 방향 결정
  const currentOrder = pageOrder[location.pathname] || 0;
  const prevOrder = pageOrder[prevPath] || 0;
  const transitionClass = currentOrder > prevOrder ? 'slide-left' : 'slide-right';

  useEffect(() => {
    setPrevPath(location.pathname);
  }, [location.pathname]);

 return (
    <TransitionGroup className="page">
      <CSSTransition
        key={location.key}
        timeout={1000}
        classNames={transitionClass}
      >
        <Routes location={location}>
          <Route path='/' element={isLoggedIn ? <MovieList /> : <Navigate to="/login" />} />
          <Route path='/wishlist' element={isLoggedIn ? <WishList /> : <Navigate to="/login" />} />
          <Route path='/popular' element={isLoggedIn ? <Popular /> : <Navigate to="/login" />} />
          <Route path='/search' element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
          <Route path='/filter' element={isLoggedIn? <Filter /> : <Navigate to="/login"/>} />
          <Route path='/login' element={isLoggedIn ? <Navigate to="/login" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/signup' element={isLoggedIn ? <Navigate to="/login" /> : <Signup />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLoginStatus = () => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    setIsLoggedIn(isLogin);
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <div className='loading-overlay'>Loading...</div>;
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
            <Nav.Link as={Link} to="/popular">Popular</Nav.Link>
          </Nav.Item>
          <Nav.Item className='nav-item'>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
          </Nav.Item>
          <Nav.Item className='nav-item'>
            <Nav.Link as={Link} to="/filter">Filter</Nav.Link>
          </Nav.Item>
          {isLoggedIn && (
            <Nav.Item className='nav-item'>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </Nav.Item>
          )}
        </Nav>
        <AnimatedRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </Router>
  );
}

export default App;
