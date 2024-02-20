import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
    <h2>
        <Link to ={'/'}>Nav Desafio Marvel</Link>
        </h2>
    <ul>
        <li>
            <Link to = {'/'}> Home </Link>
        </li>
        <li>
            <Link to = {'/buscarChar'} className="bttn"> Buscar Personagem </Link>
        </li>
    </ul>
    
    </nav>

  )
}

export default Navbar