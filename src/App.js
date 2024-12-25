import './App.css';
import React, { useState, useEffect, useLayoutEffect } from 'react';
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

function AnimatedRoutes({ isLoggedIn, setIsLoggedIn, setNickname }) {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);

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
          <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} setNickname={setNickname} />} />
          <Route path='/signup' element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
          <Route path='/kakaologin' element={<Navigate to="/" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLogin") === "true");
  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect (() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("nickname");
    localStorage.removeItem("curUserID");
    setIsLoggedIn(false);
    setNickname("");
  };

  if (isLoading) {
    return <div className='loading-overlay'>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Nav className='navbar' activeKey="/">
          <Link to="/" className="logo">
            <img src={homelog} alt="Nav logo" className='logo-img'/>
            {nickname}
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
        <AnimatedRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} nickname={nickname} />
      </div>
    </Router>
  );
}

export default App;
