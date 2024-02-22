import { Link} from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <h2>Interaja com os personagens, quadrinhos e eventos do universo Marvel</h2>
<ul>
    <Link to={`/characters`} className="button">
                Personagens
              </Link>
              
    <Link to={`/comics`}className="button">
                Comics
              </Link>
           
 
    <Link to={`/events`}className="button">
                Eventos
              </Link>
           </ul>
    </div>
  )
}

export default Home