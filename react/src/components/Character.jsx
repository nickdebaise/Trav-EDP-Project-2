import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const Character = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState();
    const [planet, setPlanet] = useState();
    const [films, setFilms] = useState();


    useEffect(() => {
        fetch("http://localhost:3001/api/characters/" + id)
            .then(resp => resp.json())
            .then(result => {
                setCharacter(result)
            })
            .catch(errs => console.error(errs))
    }, []);

    useEffect(() => {
        if (!character) return;

        fetch(`http://localhost:3001/api/planets/${character.homeworld}}`)
            .then(resp => resp.json())
            .then(result => {
                setPlanet(result)
            })
            .catch(errs => console.error(errs))
    }, [character]);

    useEffect(() => {

        fetch(`http://localhost:3001/api/characters/${id}/films`)
            .then(resp => resp.json())
            .then(result => {
                console.log(result)
                setFilms(result)
            })
            .catch(errs => console.error(errs))
    }, []);

    if (!character || !planet || films === undefined) {
        return "Loading..."
    }

    return (
        <main>
            <h1 id="name">
                {
                    character.name
                }
            </h1>
            <section id="generalInfo">
                <p>Height: <span id="height"></span>{character.height} cm</p>
                <p>Mass: <span id="mass"></span>{character.mass} kg</p>
                <p>Born: <span id="birth_year">{character.birth_year}</span></p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <a><span id="homeworld">{planet.name}</span></a>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {films.map(film => {
                        return (
                            <a>
                                {film.title}
                            </a>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Character;