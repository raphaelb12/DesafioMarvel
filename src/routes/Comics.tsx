import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Lists.css";
import config from '../axios/config'

//interface para receber os dados dos quadrinhos
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

    //faz uma requisição para obter informações dos quadrinhos
    useEffect(() => {
        if (location.pathname === '/comics') {
            config
                .get('/comics')
                .then(response => setLoadComics(response.data.data.results))
                .catch(err => console.log(err));
        }
    }, [location]);

  //Função que carrega mais personagens vindos da API
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

        //Função que busca os personagens pelo nome
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
                <h2>Onde toda a mágica nasce, nos quadrinhos do universo Marvel</h2>
                <input value={text}
                 type="text"
                  placeholder="Pesquise aqui..." 
                className="search-bar"
                 onChange={e => handleChange(e)} />
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
                            <Link to={`/comics/${comics.id}`}>
                            <button className="viewbttn">Ver mais sobre o comic</button>
                                </Link>
                        </div>
                    ))}
                </div>
                <button className="bttn" onClick={handleMore}>
                    Mais comics
                </button>
            </div>
        )
    );
};

export default Comics;
