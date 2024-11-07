import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';

function Search () {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [sortOrder, setSortOrder] = useState('popularity');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, selectedRating, sortOrder]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`API_URL?genre=${selectedGenre}&rating=${selectedRating}&sort=${sortOrder}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const resetFilters = () => {
    setSelectedGenre('');
    setSelectedRating('');
    setSortOrder('popularity');
  };

  return (
    <div className="search-page">
      <div className="filter-bar">
        <Form>
          <Form.Group controlId="genre-select">
            <Form.Label>Genre</Form.Label>
            <Form.Control as="select" value={selectedGenre} onChange={handleGenreChange}>
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="rating-select">
            <Form.Label>Rating</Form.Label>
            <Form.Control as="select" value={selectedRating} onChange={handleRatingChange}>
              <option value="">All Ratings</option>
              <option value="7">7+</option>
              <option value="8">8+</option>
              <option value="9">9+</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="sort-select">
            <Form.Label>Sort By</Form.Label>
            <Form.Control as="select" value={sortOrder} onChange={handleSortChange}>
              <option value="popularity">Popularity</option>
              <option value="release_date">Release Date</option>
              <option value="rating">Rating</option>
            </Form.Control>
          </Form.Group>

          <Button variant="secondary" onClick={resetFilters}>Reset Filters</Button>
        </Form>
      </div>

      <div className="movie-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Release Date</th>
                <th>Popularity</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </td>
                  <td>{movie.genre}</td>
                  <td>{movie.vote_average}</td>
                  <td>{movie.release_date}</td>
                  <td>{movie.popularity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Search;
