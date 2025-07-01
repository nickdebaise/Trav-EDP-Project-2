import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CharacterList = (props) => {
    const [characters, setCharacters] = useState(undefined);
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/api/characters")
            .then(resp => resp.json())
            .then(result => {
                setCharacters(result);
            })
            .catch(errs => console.error(errs))
    }, []);

    if (characters === undefined) return "Loading..."

    const filteredCharacters = characters.filter(character => {
        return character.name.toLowerCase().includes(props.search.toLowerCase())
    })

    return (
        <section id="charactersList">
            {
                filteredCharacters.map((character) => {
                    return (
                        <div key={character.id} onClick={() => {
                            navigate(`/characters/${character.id}`)
                        }}>
                            <p>{character.name}</p>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default CharacterList;