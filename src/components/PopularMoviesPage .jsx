// PopularMoviesPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/PopularMoviesPage.css';

const Api_key = "c45a857c193f6302f2b5061c3b85e743";

const PopularMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    fetchMovies();
  }, [page]); // Fetch movies whenever the page changes

  const fetchMovies = () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(error => console.error('Error fetching popular movies:', error));
  };

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="container">
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
            <p>{movie.vote_average}</p>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <span>{page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default PopularMoviesPage;
