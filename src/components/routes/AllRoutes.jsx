
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PopularMoviesPage from '../PopularMoviesPage ';
import Topratedpage from '../Topratedpage';
import Upcomingpage from '../Upcomingpage.';
import SingleMoviePage from '../Singlemoviepage';
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PopularMoviesPage />} />
      <Route path="/topratedpage" element={<Topratedpage />} />
      <Route path="/upcomingpage" element={<Upcomingpage />} />
      <Route path="/movie/:movie_id" element={<SingleMoviePage />} />

      
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default AllRoutes;
