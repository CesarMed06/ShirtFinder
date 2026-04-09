import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/catalog?search=${searchTerm}`);
            setMenuOpen(false);
        }
    };

    const token = localStorage.getItem('token');

    return (
        <header className="sf-header">
            <Link to="/">
                <img
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391529/LOGO_SHIRTFINDER_ckkr7a.png"
                    alt="Logo ShirtFinder"
                    className="sf-header__logo-icon"
                />
            </Link>

            <button
                className="sf-header__burger"
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
                <span /><span /><span />
            </button>

            <nav className={`sf-header__nav${menuOpen ? ' sf-header__nav--open' : ''}`}>
                <Link to="/" className={location.pathname === "/" ? "activo" : ""} onClick={() => setMenuOpen(false)}>HOME</Link>
                <Link to="/catalog" className={location.pathname === "/catalog" || location.pathname.startsWith("/shirt/") ? "activo" : ""} onClick={() => setMenuOpen(false)}>CATÁLOGO</Link>
                <Link to="/foro" className={location.pathname.startsWith("/foro") ? "activo" : ""} onClick={() => setMenuOpen(false)}>FORO</Link>
                {token ? (
                    <Link to="/my-account" className={location.pathname === "/my-account" ? "activo" : ""} onClick={() => setMenuOpen(false)}>MI CUENTA</Link>
                ) : (
                    <Link to="/login" className={location.pathname === "/login" ? "activo" : ""} onClick={() => setMenuOpen(false)}>MI CUENTA</Link>
                )}

                <form className="sf-header__search sf-header__search--nav" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Buscar camisetas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Buscar camisetas"
                    />
                    <img
                        src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391530/LUPA_mg7p02.png"
                        alt="Buscar"
                        className="sf-header__search-icon"
                        onClick={handleSearch}
                    />
                </form>
            </nav>

            <form className="sf-header__search sf-header__search--desktop" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Buscar camisetas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Buscar camisetas"
                />
                <img
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391530/LUPA_mg7p02.png"
                    alt="Buscar"
                    className="sf-header__search-icon"
                    onClick={handleSearch}
                />
            </form>
        </header>
    );
}

export default Header;