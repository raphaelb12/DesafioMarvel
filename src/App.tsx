import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { publicKey, time, hash, } from "./axios/config";


const App: React.FC = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then(response => console.log(response.data.data))
      .catch(err => console.log(err));
  }, []);
  

  return (
    <>
      <div>
    <Navbar />
    <h1>Desafio Marvel</h1>
    <Outlet />
      </div>
    </>
  )
}

export default App
