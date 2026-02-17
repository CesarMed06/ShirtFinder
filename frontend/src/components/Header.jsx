import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/catalog?search=${searchTerm}`);
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

            <nav className="sf-header__nav">
                <Link to="/" className={location.pathname === "/" ? "activo" : ""}>HOME</Link>
                <Link to="/catalog" className={location.pathname === "/catalog" || location.pathname.startsWith("/shirt/") ? "activo" : ""}>CATÁLOGO</Link>
                <Link to="#">FORO</Link>
                {token ? (
                    <Link to="/my-account" className={location.pathname === "/my-account" ? "activo" : ""}>MI CUENTA</Link>
                ) : (
                    <Link to="/login" className={location.pathname === "/login" ? "activo" : ""}>MI CUENTA</Link>
                )}
            </nav>

            <form className="sf-header__search" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Buscar camisetas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768391530/LUPA_mg7p02.png"
                    alt="Buscar"
                    className="sf-header__search-icon"
                    onClick={handleSearch}
                    style={{ cursor: 'pointer' }}
                />
            </form>
        </header>
    );
}

export default Header;
