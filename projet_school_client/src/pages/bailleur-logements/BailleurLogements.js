import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrigez l'importation
import './BailleurLogements.css'; // Importez le fichier CSS

function BailleurLogements() {
  const [bailleurId, setBailleurId] = useState('');
  const [bailleurName, setBailleurName] = useState('');
  const [logements, setLogements] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('tokenBailleur');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      
      if (decodedToken.bailleurId) {
        console.log('Avant setBailleurId:', bailleurId);
        setBailleurId(prevId => {
          console.log('Setting new bailleurId:', decodedToken.bailleurId);
          return decodedToken.bailleurId;
        });
        setBailleurName(decodedToken.name);
        
        // Vérifier la mise à jour
        setTimeout(() => {
          console.log('Après setBailleurId:', bailleurId);
        }, 0);
      }
    }
  }, [bailleurId]);

  // Ajouter un useEffect pour surveiller les changements de bailleurId
  useEffect(() => {
    console.log('bailleurId a changé:', bailleurId);
  }, [bailleurId]);
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
      <h1>Voyez ici la liste de tous vos logements {bailleurName}</h1>
      <div className="logements-list">
        {logements.map(logement => (
          <div key={logement._id} className="logement-card">
            <Link to={`/logement/${logement._id}`}>
              <img 
                  src={`http://localhost:5000/uploads/${logement.image}`} 
                  alt={logement.title}
              />
            </Link>
            <h2>{logement.title}</h2>
            
            <p>{logement.description}</p>
            <p>Prix: {logement.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BailleurLogements;