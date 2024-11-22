import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import houseImage from './images/furniture.jpg'; // Assurez-vous d'avoir une image dans le dossier images

function HomePage() {
    const sharedata = localStorage.getItem('username');
    return (
        <div className="homepage-container">
            <header className="header">
                <h1>Bienvenue sur notre site de vente de logements</h1>
                <p>Découvrez les meilleures offres immobilières</p>
            </header>
            <main className="main-content">
                <img src={houseImage} alt="House" className="main-image" />
                <h2>Bienvenue {sharedata}</h2>
                <p>Explorez notre collection de logements disponibles à la vente.</p>
                <div className="buttons">
                    <Link to="/bailleurLogin" className="button">S'enregistrer en tant que Bailleur</Link>
                    <Link to="/logements" className="button">Voir les Logements</Link>
                </div>
            </main>
        </div>
    );
}

export default HomePage;