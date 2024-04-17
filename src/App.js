// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import PopularMoviesPage from './components/PopularMoviesPage ';
import Topratedpage from './components/Topratedpage';
import AllRoutes from './components/routes/AllRoutes';

function App() {
  return (
 
      <div>
        <Navbar />
        <AllRoutes/>
      

      </div>
   
  );
}

export default App;
