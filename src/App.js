import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import MovieList from './movie/movie';
import Popular from './movie/popular';


function WishList() {
  return null; // WishList 컴포넌트 구현 필요
}

function Search() {
  return null; // Search 컴포넌트 구현 필요
}

function App() {
  return (
    <BrowserRouter>
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
          <Route path='/' element={<MovieList/>} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/movie/popular' element={<Popular />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
