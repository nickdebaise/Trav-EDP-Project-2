import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";


const Planet = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [planet, setPlanet] = useState();
    const [films, setFilms] = useState();
    const [characters, setCharacters] = useState();


    useEffect(() => {
        fetch("http://localhost:3001/api/planets/" + id)
            .then(resp => resp.json())
            .then(result => {
                setPlanet(result)
            })
            .catch(errs => console.error(errs))
    }, []);

    useEffect(() => {
        if (!planet) return;

        fetch(`http://localhost:3001/api/planet/${planet.id}/films`)
            .then(resp => resp.json())
            .then(result => {
                setFilms(result)
            })
            .catch(errs => console.error(errs))
    }, [planet]);

    useEffect(() => {
        if (!planet) return;

        fetch(`http://localhost:3001/api/planet/${planet.id}/characters`)
            .then(resp => resp.json())
            .then(result => {
                setCharacters(result)
            })
            .catch(errs => console.error(errs))
    }, [planet]);


    if (!planet || films === undefined || characters === undefined) {
        return "Loading..."
    }

    return (
        <main>
            <h1 id="name">{planet.name}</h1>

            <section id="planet_view">
                <ul>
                    <li>
                        <p>Climate: <span id="climate">{planet.climate}</span></p>
                    </li>
                    <li>
                        <p>Diameter: <span id="diameter">{planet.diameter}</span></p>
                    </li>
                    <li>
                        <p>Gravity: <span id="gravity">{planet.gravity}</span></p>
                    </li>
                    <li>
                        <p>Orbital period: <span id="orbital_period">{planet.orbital_period}</span></p>
                    </li>
                    <li>
                        <p>Rotation Period: <span id="rotation_period">{planet.rotation_period}</span></p>
                    </li>
                    <li>
                        <p>Terrain: <span id="terrain">{planet.terrain}</span></p>
                    </li>
                    <li>
                        <p>Surface Water: <span id="surface_water">{planet.surface_water}</span></p>
                    </li>
                    <li>
                        <p>Population: <span id="population">{planet.population}</span></p>
                    </li>
                </ul>
            </section>

            <section id="films">
                <h2>Films</h2>
                <ul>
                    {films.map(film => {
                        return (
                            <a key={film.id} onClick={() => { Navigate('/films/' + film.id) }}>
                                {film.title}
                            </a>
                        )
                    })}
                </ul>
            </section>

            <section id="characters">
                <h2>Characters From Planet</h2>
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




export default Planet;