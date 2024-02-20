import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import './App.css'
import Home from './routes/Home';


const App: React.FC = () => {


  
  return (
    <div className="App">
     <Navbar/> 
     <h1>Desafio Marvel</h1>
     <div className="container">
      <Outlet />
      <Home />
     </div>
      </div>
  )
}

export default App
