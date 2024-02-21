import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="bg">
                <img src="https://upload.wikimedia.org/wikipedia/pt/3/30/Universo_Marvel.png"
                 alt="" /> </div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
