import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './BailleurLogements.css'; // Importez le fichier CSS

function BailleurLogements() {
  const [bailleurId, setBailleurId] = useState('');
  const [bailleurName, setBailleurName] = useState('');
  const [logements, setLogements] = useState([]);

  useEffect(() => {
    // Récupérer le jeton JWT depuis le localStorage
    const token = localStorage.getItem('tokenBailleur');
    if (token) {
      // Décoder le jeton JWT pour obtenir l'ID et le nom du bailleur
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Ajoutez cette ligne pour déboguer
      setBailleurId(decodedToken.id);
      setBailleurName(decodedToken.name);
    }
  }, []);

  useEffect(() => {
    // Fonction pour récupérer les données des logements du bailleur
    const fetchLogements = async () => {
      try {
        const token = localStorage.getItem('tokenBailleur');
        const response = await axios.get(`http://localhost:5000/api/logement/${bailleurId}/logements`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data; // Parser la réponse en JSON
        console.log('Réponse de l\'API:', data);
        setLogements(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des logements:', error);
      }
    };

    if (bailleurId) {
      fetchLogements();
    }
  }, [bailleurId]);

  return (
    <div className="bailleur-logements">
      <h1>Mes logements en vente {bailleurName}</h1>
      <div className="logement-grid">
        {logements.length === 0 ? (
          <p>Aucun logement trouvé.</p>
        ) : (
          logements.map(logement => (
            <div key={logement._id} className="logement-card">
              <img src={logement.image} alt={logement.title} />
              <h2>{logement.title}</h2>
              <p>{logement.description}</p>
              <p>Prix: {logement.price} €</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BailleurLogements;
