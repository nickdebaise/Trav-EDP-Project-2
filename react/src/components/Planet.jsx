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

            <section id="films">
                <h2>Films</h2>
                <ul>
                    {films.map(film => {
                        return (
                            <a onClick={()=>{Navigate('/films/'+ film.id)}}>
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
                            <a onClick={()=>{Navigate('/characters/'+ character.id)}}>
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