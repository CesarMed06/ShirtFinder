import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 

function Header() {
    const location = useLocation(); 

    return (
    <header className="sf-header">
        <div className="sf-header__logo">
        <img 
            src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391529/LOGO_SHIRTFINDER_ckkr7a.png" 
            alt="ShirtFinder Logo" 
            className="sf-header__logo-icon" 
        />
        </div>

        <nav className="sf-header__nav">
        <Link 
            to="/" 
            className={location.pathname === "/" ? "activo" : ""}
        >
            HOME
        </Link>

        <Link to="#">CATÁLOGO</Link>
        <Link to="#">FORO</Link>

        <Link 
            to="/login" 
            className={location.pathname === "/login" ? "activo" : ""}
        >
            MI CUENTA
        </Link>
        </nav>

        <div className="sf-header__search">
        <input type="text" placeholder="Buscar camisetas..." />
        <img 
            src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391530/LUPA_mg7p02.png" 
            alt="Buscar" 
            className="sf-header__search-icon"
        />
        </div>
    </header>
    );
}

export default Header;