import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import "./HomePage.css";
import houseImage from './images/15.jpg'; // Assurez-vous d'avoir une image dans le dossier images

function HomePage() {
    const [username, setUsername] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            console.log('Decoded Token:', userId);
            
            fetchUserData(userId, token);
        }
    }, [token]);

    const fetchUserData = async (userId, token) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUsername(data.username);
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
    };

    return (
        <div className="homepage-container">
            <div className="header">
                <h1>Bienvenue sur NdapKwata notre site de vente de logements</h1>
                <p>Découvrez les meilleures offres immobilières</p>
            </div>
            <main className="main-content">

                <img src={houseImage} alt="House" className="main-image" />

                
                <h2>{username} <br/> </h2>
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