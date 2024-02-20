import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import config from '../axios/config'
import './Home.css'

interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Home = () => {
  const [loadCharacters, setLoadCharacters] = useState<Character[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      config.get('/characters')
        .then(response => setLoadCharacters(response.data.data.results))
        .catch(err => console.log(err));
    }
  }, [location]);

  const handleMore = useCallback(async() => {
    try {
      const offset = loadCharacters.length;
      const response = await config.get('/characters', {
        params: {
          offset,
        }
      });
      setLoadCharacters([...loadCharacters, ...response.data.data.results]);
    } catch (err) {
      console.log(err);
    }
  }, []);
  
  return (
    location.pathname === '/' && (
      <div>
        <h1>Personagens Marvel</h1>
        <div className="container">
          {loadCharacters.map((character) => (
            <div key={character.id} className="card">
              <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
              <h2>{character.name}</h2>
              <p>{character.description}</p>
              <Link to={`/${character.id}`}>Ver mais</Link>
            </div>
            
          ))}
        </div>
        <button className="bttn" onClick={handleMore}>Mais Personagens</button>
      </div>
    )
  );
};
export default Home;
