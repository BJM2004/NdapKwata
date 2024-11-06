import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './AddLogement.css'; // Importez le fichier CSS

function AddLogement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [bailleurId, setBailleurId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Récupérer le jeton JWT depuis le localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Décoder le jeton JWT pour obtenir l'ID du bailleur
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken.id) {
          setBailleurId(decodedToken.id);
          console.log('Bailleur ID:', decodedToken.id);
        } else {
          console.error('ID not found in token');
        }
      } else {
        console.error('Token not found in localStorage');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bailleurId) {
      console.error('Bailleur ID is not set');
      return;
    }

    const newLogement = {
      title,
      description,
      price: parseFloat(price),
      image,
      bailleur: bailleurId, // Utilisez bailleurId pour le champ bailleur
    };

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/logements', newLogement, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding logement:', error);
    }
  };

  return (
    <div className="add-logement-form">
      <h1>Ajouter un logement</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Prix:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddLogement;
