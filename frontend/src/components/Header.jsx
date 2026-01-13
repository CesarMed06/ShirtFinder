import React from 'react';

function Header() {
    return (
    <header className="sf-header">
        <div className="sf-header__logo">
        <span className="sf-header__logo-icon">SHIRTFINDER</span>
        </div>

        <nav className="sf-header__nav">
        <a href="#" className="activo">HOME</a>
        <a href="#">CATÁLOGO</a>
        <a href="#">FORO</a>
        <a href="#">MI CUENTA</a>
        </nav>

        <div className="sf-header__search">
        {}
        <input type="text" placeholder="Buscar camisetas" />
        </div>
    </header>
    );
}

export default Header;