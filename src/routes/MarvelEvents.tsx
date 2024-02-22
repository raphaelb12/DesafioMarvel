import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Lists.css";
import config from '../axios/config'

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

const MarvelEvents = () => {
    const [loadEvents, setLoadEvents] = useState<MarvelEvents[]>([]);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/events') {
            config
                .get('/events')
                .then(response => setLoadEvents(response.data.data.results))
                .catch(err => console.log(err));
        }
    }, [location]);

  //Função que carrega mais personagens vindos da API
    const handleMore = useCallback(async () => {
        try {
            const offset = loadEvents.length;
            const response = await config.get('/events', {
                params: {
                    offset,
                },
            });

            setLoadEvents(prevEvents => [...prevEvents, ...response.data.data.results]);
        } catch (err) {
            console.log(err);
        }
    }, [loadEvents]);

    const [text, setText] = useState('');


    //Função que busca os personagens pelo nome
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
        if (value === '') {
            config
                .get('/events')
                .then(response => setLoadEvents(response.data.data.results))
                .catch(err => console.log(err));
        } else {
            config
                .get('/events', {
                    params: {
                        nameStartsWith: value,
                    },
                })
                .then(response => setLoadEvents(response.data.data.results))
                .catch(err => console.log(err));
        }
    };


  return (
    location.pathname === '/events' && (
        <div>
            <h1>MARVEL EVENTS</h1>
            <h2>Os eventos, histórias e acontecimentos do universo Marvel</h2>
            <input value={text} 
            type="text" 
            placeholder="Pesquise aqui..."
             className="search-bar"
              onChange={e => handleChange(e)} />
            <div className="container">
                {loadEvents.map(events => (
                    <div key={events.id} className="card">
                        <img className="img-container" src={`${events.thumbnail.path}.${events.thumbnail.extension}`} alt={events.title} />
                        <h2>{events.title}</h2>
                        {events.description === '' ? (
                            <p>Descrição não disponível</p>
                        ) : (
                            <p>{events.description}</p>
                        )}
                        <Link to={`/events/${events.id}`}><button className="viewbttn">Ver mais sobre o evento</button></Link>
                    </div>
                ))}
            </div>
            <button className="bttn" onClick={handleMore}>
                Mais eventos
            </button>
        </div>
    )
  )
}

export default MarvelEvents