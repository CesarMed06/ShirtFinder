import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

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
                <Link to="/login" className={location.pathname === "/login" ? "activo" : ""}>MI CUENTA</Link>
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
