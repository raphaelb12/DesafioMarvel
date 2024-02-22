import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../axios/config';
import "./view.css";


//interface para receber os dados dos personagens
interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const Characters = () => {
   // obtendo o parâmetro 'id' da URL 
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  //faz uma requisição para obter informações do personagem
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await config.get(`/characters/${id}`);
         // Atualizando o estado do personagem com os dados obtidos da requisição
        setCharacter(response.data.data.results[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  // exibe as informações do personagem
  return (
    <div className="view-container">
      <img className="view-image" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
      <div className="view-details">
        <h1 className="view-name">{character.name}</h1>
        <p className="view-description"> {character.description === '' ? (
        <p>Descrição não disponível</p>
        ) : (
        <p>{character.description}</p>
        )}</p>
      </div>
    </div>
  );
    
            }  

export default Characters;