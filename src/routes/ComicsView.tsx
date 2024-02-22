import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../axios/config';
import './view.css';



//interface para receber os dados dos quadrinhos
interface Comics {
    id: string;
    title: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }; 
}

const ComicsView = () => {
   // obtendo o parâmetro 'id' da URL 
   const { id } = useParams<{ id: string }>();
  const [comic, setComic] = useState<Comics | null>(null);
  //faz uma requisição para obter informações
  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await config.get(`/comics/${id}`);
       // Atualizando o estado dos quadrinhos com os dados obtidos da requisição
        setComic(response.data.data.results[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComic();
  }, [id]);

  if (!comic) {
    return <div>Loading...</div>;
  }


  // exibe as informações do personagem
  return (
    <div className="view-container" >
      <img className="view-image" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
      <div className="view-details" >
        <h1 className="view-title" >{comic.title}</h1>
        <p  className="view-description"> {comic.description === '' ? (
        <p>Descrição não disponível</p>
        ) : (
        <p>{comic.description}</p>
        )}</p>
      </div>
    </div>
  )
}

export default ComicsView