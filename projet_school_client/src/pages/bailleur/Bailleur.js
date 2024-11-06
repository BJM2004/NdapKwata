import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Bailleur.css";

function Bailleur() {
    const [name, setName] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifiez que les mots de passe correspondent
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('adresse', adresse);
        formData.append('telephone', telephone);
        formData.append('email', email);
        formData.append('password', password);
        if (profile) {
            formData.append('profile', profile);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/bailleurs/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const token = response.data.token; // Assurez-vous que le token est inclus dans la réponse
            localStorage.setItem('token', token);
            navigate('/bailleur-logements');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Erreur lors de l\'enregistrement. Veuillez réessayer.');
        }
    };

    return (
        <div className="bailleur-form">
            <h2>Enregistrement Bailleur</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="profile-input">
                    <label>Profil:</label>
                    <input type="file" onChange={(e) => setProfile(e.target.files[0])} required />
                </div>

                <div>
                    <label>Nom:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Adresse:</label>
                    <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
                </div>
                <div>
                    <label>Téléphone:</label>
                    <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirmer le mot de passe:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
}

export default Bailleur;
