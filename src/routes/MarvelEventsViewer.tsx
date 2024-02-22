import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../axios/config';
import './view.css';


interface MarvelEvents {
    id: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    thumbnail: {
        path: string;
        extension: string;
    };
}

const MarvelEventsViewer = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<MarvelEvents | null>(null);
  
    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await config.get(`/events/${id}`);
          setEvent(response.data.data.results[0]);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchEvent();
    }, [id]);
  
    if (!event) {
      return <div>Loading...</div>;
    }
  
  
    return (
      <div className="view-container">
        <img className="view-image" src={`${event.thumbnail.path}.${event.thumbnail.extension}`} alt={event.title} />
        <div className="view-details">
          <h1 className="view-title">{event.title}</h1>
          <p className="view-description">{event.description === '' ? (
            <p>Descrição não disponível</p>
          ) : (
            <p>{event.description}</p>
          )}</p>
          <p className="view-other">Data de inicio:  {new Date(event.start).toLocaleDateString()}</p>
          <p className="view-other">Data do fim:  {new Date(event.end).toLocaleDateString()}</p>
        </div>
      </div>
    )
}

export default MarvelEventsViewer