import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/login";
import LogementList from "./pages/logement-list/LogementList";
import AddLogement from "./pages/add_logement/AddLogement";
import BailleurLogements from "./pages/bailleur-logements/BailleurLogements";
import Bailleur from "./pages/bailleur/Bailleur";
import LogementDescription from "./pages/logement-description/LogementDescription";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/logements">Logements</Link>
            </li>
            <li>
              <Link to="/add-logement">Add</Link>
            </li>
            <li>
              <Link to="/bailleur-logements">Bailleur Logements</Link>
            </li>
            <li>
              <Link to="/bailleurLogin">bailleurLogin</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logements" element={<LogementList />} />
          <Route path="/add-logement" element={<AddLogement />} />
          <Route path="/bailleur-logements" element={<BailleurLogements />} />
          <Route path="/bailleurLogin" element={<Bailleur />} />
          <Route path="/logement/:id" element={<LogementDescription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
