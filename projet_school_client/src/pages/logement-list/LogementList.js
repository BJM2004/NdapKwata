// LogementList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LogementList.css'; // Importez le fichier CSS

function LogementList() {
  const [logements, setLogements] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données des logements
    const fetchLogements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/logement');
        const text = await response.text(); // Lire la réponse comme du texte
        console.log('Réponse brute:', text); // Afficher la réponse brute
        const data = JSON.parse(text); // Parser la réponse en JSON
        console.log('Réponse de l\'API:', data);
        setLogements(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des logements:', error);
      }
    };

    fetchLogements();
  }, []);
  

  return (
    <div className="logement-list">
      <h1>Logements en vente</h1>
      <div className="logement-grid">
        {logements.length === 0 ? (
          <p>Aucun logement trouvé.</p>
        ) : 
        logements.map(logement => (
          <div key={logement._id} className="logement-card">
            <Link to={`/logement/${logement._id}`}>
              <img 
                  src={`http://localhost:5000/uploads/${logement.image}`} 
                  alt={logement.title}
              />
            </Link>
            <h2>{logement.title}</h2>
            <p>{logement.description}</p>
            <p>Prix: {logement.price} FCFA</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogementList;
