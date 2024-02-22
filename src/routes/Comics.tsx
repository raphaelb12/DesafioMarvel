import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Lists.css";
import config from '../axios/config'

interface Comics {
    id: string;
    title: string;
    description: string;
    issuenumber: number;
    thumbnail: {
        path: string;
        extension: string;
    };
}

const Comics = () => {
    const [loadComics, setLoadComics] = useState<Comics[]>([]);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/comics') {
            config
                .get('/comics')
                .then(response => setLoadComics(response.data.data.results))
                .catch(err => console.log(err));
        }
    }, [location]);

    const handleMore = useCallback(async () => {
        try {
            const offset = loadComics.length;
            const response = await config.get('/comics', {
                params: {
                    offset,
                },
            });

            setLoadComics(prevComics => [...prevComics, ...response.data.data.results]);
        } catch (err) {
            console.log(err);
        }
    }, [loadComics]);

    const [text, setText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);
        if (value === '') {
            config
                .get('/comics')
                .then(response => setLoadComics(response.data.data.results))
                .catch(err => console.log(err));
        } else {
            config
                .get('/comics', {
                    params: {
                        titleStartsWith: value,
                    },
                })
                .then(response => setLoadComics(response.data.data.results))
                .catch(err => console.log(err));
        }
    };

    return (
        location.pathname === '/comics' && (
            <div>
                <h1>MARVEL COMICS</h1>
                <input value={text} type="text" placeholder="Search Here" className="search-bar" onChange={e => handleChange(e)} />
                <div className="container">
                    {loadComics.map(comics => (
                        <div key={comics.id} className="card">
                            <img className="img-container" src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`} alt={comics.title} />
                            <h2>{comics.title}</h2>
                            {comics.description === '' ? (
                                <p>Descrição não disponível</p>
                            ) : (
                                <p>{comics.description}</p>
                            )}
                            <Link to={`/comics/${comics.id}`}>Ver mais sobre o quadrinho</Link>
                        </div>
                    ))}
                </div>
                <button className="bttn" onClick={handleMore}>
                    Load more Comics
                </button>
            </div>
        )
    );
};

export default Comics;
