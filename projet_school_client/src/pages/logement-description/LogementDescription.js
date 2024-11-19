import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './LogementDescription.css'; // Importez le fichier CSS

function LogementDetail() {
  const { id } = useParams();
  const [logement, setLogement] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données du logement
    const fetchLogement = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/logement/${id}`);
        const text = await response.text(); // Lire la réponse comme du texte
        console.log('Réponse brute:', text); // Afficher la réponse brute
        const data = JSON.parse(text); // Parser la réponse en JSON
        console.log('Réponse de l\'API:', data);
        setLogement(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du logement:', error);
      }
    };

    fetchLogement();
  }, [id]);

  if (!logement) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="logement-detail">
      <h1>{logement.title}</h1>
      <img src={`http://localhost:5000/uploads/${logement.image}`} alt={logement.title} />
      <p>{logement.description}</p>
      <p>Prix: {logement.price} €</p>
      <div className="bailleur-info">
        <h2>Bailleur</h2>
        <p>Nom: {logement.bailleur.name}</p>
        <p>Adresse: {logement.bailleur.adresse}</p>
        <p>Téléphone: {logement.bailleur.telephone}</p>
        <p>Email: {logement.bailleur.email}</p>
        <img src={`http://localhost:5000/uploads/${logement.bailleur.profile}`} alt={logement.bailleur.name} />
      </div>
    </div>
  );
}

export default LogementDetail;
