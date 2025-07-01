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

function App() {
  return (
    <div>
      <h1>Star Wars Universe Lookup</h1>
      <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
        here)</span></label>
      <input id="searchString" />
      <Router>
        <Routes>
          <Route exact path="/" element={(<CharacterList search={""} />)} />
          <Route exact path="/characters/:id" element={(<Character />)} />
          <Route exact path="/films/:id" element={(<Film />)} />
          <Route exact path="/planets/:id" element={(<Planet />)} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
