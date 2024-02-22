import { Link } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
    <h2>
        <Link to ={'/'}>Marvel API</Link>
        </h2>
    <ul>
        <li>
            <Link to = {'/'} className="bttn"> Home </Link>
        </li>
    </ul>
    </nav>

  )
}

export default Navbar