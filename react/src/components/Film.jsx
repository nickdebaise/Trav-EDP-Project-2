import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";


const Film = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [film, setFilm] = useState();
    const [planets, setPlanets] = useState();
    const [characters, setCharacters] = useState();


    useEffect(() => {
        fetch("http://localhost:3001/api/films/" + id)
            .then(resp => resp.json())
            .then(result => {
                setFilm(result)
            })
            .catch(errs => console.error(errs))
    }, []);

    useEffect(() => {
        if (!film) return;

        fetch(`http://localhost:3001/api/films/${film.id}/planets`)
            .then(resp => resp.json())
            .then(result => {
                setPlanets(result)
            })
            .catch(errs => console.error(errs))
    }, [film]);

    useEffect(() => {
        if (!film) return;

        fetch(`http://localhost:3001/api/films/${film.id}/characters`)
            .then(resp => resp.json())
            .then(result => {
                setCharacters(result)
            })
            .catch(errs => console.error(errs))
    }, [film]);


    if (!film || planets === undefined || characters === undefined) {
        return "Loading..."
    }

    return (
        <main>
            <h1 id="name">{film.title}</h1>

            <section id="generalInfo">
                <p>Opening Crawl: <span id="Opening Crawl">{film.opening_crawl}</span></p>

                <p>Director: <span id="Director">
                    {film.director}</span></p>
                <p>Episode ID: <span id="Episode ID">
                    {film.episode_id}</span> </p>
                <p>Producer: <span id="Producer">{film.producer} </span></p>
                <p>Release Date: <span id="Release Date">{film.release_date} </span></p>
            </section>

            <section id="planets">
                <h2>Planets</h2>
                <ul>
                    {planets.map(planet => {
                        return (
                            <a key={planet.id} onClick={() => { Navigate('/planets/' + planet.id) }}>
                                {planet.name}
                            </a>
                        )
                    })}
                </ul>
            </section>

            <section id="characters">
                <h2>Characters in film</h2>
                <ul>
                    {characters.map(character => {
                        return (
                            <a key={character.id} onClick={() => { Navigate('/characters/' + character.id) }}>
                                {character.name}
                            </a>
                        )
                    })}
                </ul>
            </section>
        </main>
    )

}




export default Film;