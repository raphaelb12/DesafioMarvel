import React from 'react'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import config from '../axios/config'

import './Home.css'

import axios from 'axios'

//Estrutura para receber os dados de um personagem
interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;}
  
}


const Home = () => {
  const [posts, setPosts] = useState([])
  const [loadCharacters, setloadCharacters] = useState<Character[]>([]); //Array de personagens
  


  useEffect(() => {
    config.get('/characters')
    .then(response => setloadCharacters(response.data.data.results) )
    .catch(err => console.log(err));}, []) 
  
  return (
    <div>
      <h1>Personagens Marvel</h1>
      <div className="container">
        {loadCharacters.map((character) => (
          <div key={character.id} className="card">
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <Link to={`/character/${character.id}`}>Ver mais</Link>
          </div>
        ))}
      </div>
  </div>
  )
} 

export default Home