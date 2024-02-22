import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import config from "../axios/config";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
<ul>
    <Link to={`/characters`} className="button">
                Personagens
              </Link>
              
    <Link to={`/comics`}className="button">
                Comics
              </Link>
           
 
    <Link to={`/events`}className="button">
                Events
              </Link>
           </ul>
    </div>
  )
}

export default Home