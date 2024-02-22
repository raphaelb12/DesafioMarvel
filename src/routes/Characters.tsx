import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../axios/config';
import "./view.css";


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
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await config.get(`/characters/${id}`);
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