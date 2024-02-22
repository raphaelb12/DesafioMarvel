import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import config from "../axios/config";
import "./Lists.css";

interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CharactersList = () => {
  const [loadCharacters, setLoadCharacters] = useState<Character[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/characters") {
      config
        .get("/characters")
        .then((response) => setLoadCharacters(response.data.data.results))
        .catch((err) => console.log(err));
    }
  }, [location]);

  //Função que carrega mais personagens vindos da API
  const handleMore = useCallback(async () => {
    try {
      const offset = loadCharacters.length;
      const response = await config.get("/characters", {
        params: {
          offset,
        },
      });

      setLoadCharacters((prevCharacters) => [
        ...prevCharacters,
        ...response.data.data.results,
      ]);
    } catch (err) {
      console.log(err);
    }
  }, [loadCharacters]);

  //Função que busca os personagens pelo nome
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    if (value === "") {
      config
        .get("/characters")
        .then((response) => setLoadCharacters(response.data.data.results))
        .catch((err) => console.log(err));
    } else {
      config
        .get("/characters", {
          params: {
            nameStartsWith: value,
          },
        })
        .then((response) => setLoadCharacters(response.data.data.results))
        .catch((err) => console.log(err));
    }
  };

  const [text, setText] = useState("");

  return (
    location.pathname === "/characters" && (
      <div>
        <h1>MARVEL CHARACTERS</h1>
        <h2>Os heróis, vilões e todos os personagens do universo Marvel</h2>
        <input
          value={text}
          type="text"
          placeholder="Pesquise aqui..."
          className="search-bar"
          onChange={(e) => handleChange(e)}
        />
        <div className="container">
          {loadCharacters.map((character) => (
            <div key={character.id} className="card">
              <img
                className="img-container"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <h2>{character.name}</h2>
              {character.description === "" ? (
                <p>Descrição não disponível</p>
              ) : (
                <p>{character.description}</p>
              )}
              <Link to={`/characters/${character.id}`}>
              <button className="viewbttn">Ver mais sobre o personagem</button>
              </Link>
            </div>
          ))}
        </div>
        <button className="loadbttn" onClick={handleMore}>
          Mais Personagens
        </button>
      </div>
    )
  );
};
export default CharactersList;