import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../axios/config';
import './Characters.css';

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
    <div className="characters-container">
      <img className="character-image" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
      <div className="character-details">
        <h1 className="character-name">{character.name}</h1>
        <p className="character-description"> {character.description === '' ? (
        <p>Descrição não disponível</p>
        ) : (
        <p>{character.description}</p>
        )}</p>
      </div>
    </div>
  );
    
            }  

export default Characters;