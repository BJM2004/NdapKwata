import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
    const sharedata=localStorage.getItem('username');
    return(
        <>
            <h2>Home Page</h2>
            <p>Welcome {sharedata} to the home page</p>
            <h2>S'enregister en tant que Bailleur</h2>
            <button><Link to="/bailleurLogin">BailleurLogin</Link></button>
        </>
    );
}
export default HomePage;