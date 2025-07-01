import './App.css'
import CharacterList from './components/CharacterList';
import Character from './components/Character';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Star Wars Universe Lookup</h1>
      <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
        here)</span></label>
      <input id="searchString" autocomplete="off" />
      <Router>
        <Routes>
          <Route exact path="/" element={(<CharacterList search={""} />)} />
          <Route exact path="/characters/:id" element={(<Character />)} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
