import React from 'react';

function Header() {
    return (
    <header className="sf-header">
        {}
        <div className="sf-header__logo">
        <img 
            src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391529/LOGO_SHIRTFINDER_ckkr7a.png" 
            alt="ShirtFinder Logo" 
            className="sf-header__logo-icon" 
        />
        </div>

        <nav className="sf-header__nav">
        <a href="#" className="activo">HOME</a>
        <a href="#">CATÁLOGO</a>
        <a href="#">FORO</a>
        <a href="#">MI CUENTA</a>
        </nav>

        {}
        <div className="sf-header__search">
        <input type="text" placeholder="Buscar camisetas" />
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