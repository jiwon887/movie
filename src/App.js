import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate, Routes, Route, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Movie from './movie/movie';

function Home(){
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=5bcbe438deafd116de4c935da4564925');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <Movie
            poster_path={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            genre_ids={movie.genre_ids}
            id={movie.id}
          />
        </div>
      ))}
    </div>
      );
}

function WishList(){
  return;
}

function Popular(){
  return;
}

function Search(){
  return;
}



function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav className='navbar'
              activeKey="/"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
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
        </Nav>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/wishlist' element={<WishList/>}/>
              <Route path='/popular' element={<Popular/>}/>
              <Route path='/search' element={<Search/>}/>
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
