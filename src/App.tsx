import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
