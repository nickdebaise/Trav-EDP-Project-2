import './App.css'
import CharacterList from './components/CharacterList';
import Character from './components/Character';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Film from './components/Film';
import Planet from './components/Planet';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("")
  return (
    <div>
      <h1>Star Wars Universe Lookup</h1>
      <label htmlFor="searchString">Who you looking for?</label>
      <input id="searchString" value={search} onChange={e => setSearch(e.target.value)} />
      <Router>
        <Routes>
          <Route exact path="/" element={(<CharacterList search={search} />)} />
          <Route exact path="/characters/:id" element={(<Character />)} />
          <Route exact path="/films/:id" element={(<Film />)} />
          <Route exact path="/planets/:id" element={(<Planet />)} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
