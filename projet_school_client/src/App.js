import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontawesome';
import './App.css';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/register';
import LogementList from './pages/logement-list/LogementList';
import AddLogement from './pages/add_logement/AddLogement';
import BailleurLogements from './pages/bailleur-logements/BailleurLogements';
import Bailleur from './pages/bailleur/Bailleur';
import LogementDescription from './pages/logement-description/LogementDescription';
import LoginPage from './pages/loginUser/loginUser';
import LoginBailleur from './pages/bailleurLogin/bailleurLogin';
import logo from './images/Designer2.png'; // Assurez-vous de spécifier le bon chemin vers votre logo

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="logo-container">
            <img src={logo} alt="NdapKwata Logo" className="logo" />
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/"><FontAwesomeIcon icon="home" /> Accueil</Link>
            </li>
            <li>
              <Link to="/register"><FontAwesomeIcon icon="user" /> Inscription</Link>
            </li>
            <li>
              <Link to="/logements">Logements</Link>
            </li>
            <li>
              <Link to="/add-logement"><FontAwesomeIcon icon="plus" /> Ajouter Logement</Link>
            </li>
            <li>
              <Link to="/bailleur-logements">Bailleur Logements</Link>
            </li>
            <li>
              <Link to="/bailleurRegister">Enregistrement Bailleur</Link>
            </li>
            <li>
              <Link to="/login">Se reconnecter</Link>
            </li>
            <li>
              <Link to="/bailleurLogin">Connexion Bailleur</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logements" element={<LogementList />} />
            <Route path="/add-logement" element={<AddLogement />} />
            <Route path="/bailleur-logements" element={<BailleurLogements />} />
            <Route path="/bailleurRegister" element={<Bailleur />} />
            <Route path="/logement/:id" element={<LogementDescription />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/bailleurLogin" element={<LoginBailleur />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;