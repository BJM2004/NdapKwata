import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './AddLogement.css'; // Importez le fichier CSS

function AddLogement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [bailleurId, setBailleurId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Récupérer le jeton JWT depuis le localStorage
      const token = localStorage.getItem('tokenBailleur');
      if (token) {
        // Décoder le jeton JWT pour obtenir l'ID du bailleur
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken.bailleurId) {
          setBailleurId(decodedToken.bailleurId);
          console.log('Bailleur ID:', decodedToken.bailleurId);
        } else {
          console.error('Bailleur ID not found in token');
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
      setError('Bailleur ID is not set');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    formData.append('image', image);
    formData.append('bailleur', bailleurId);

    const token = localStorage.getItem('tokenBailleur');

    if (!token) {
      console.error('Token not found in localStorage');
      setError('Token not found in localStorage');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/logement/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding logement:', error);
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état
        // qui sort de la plage des 2xx
        setError(error.response.data.message || 'Erreur lors de l\'ajout du logement.');
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setError('Aucune réponse reçue du serveur.');
      } else {
        // Quelque chose s'est produit lors de la configuration de la requête
        setError('Erreur lors de la configuration de la requête : ' + error.message);
      }
    }
  };

  return (
    <div className="add-logement-form">
      <h1>Ajouter un logement</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddLogement;
