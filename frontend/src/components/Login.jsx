import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);
        
        if (!result.success) {
            setError(result.error || 'Error al iniciar sesión');
        }
        
        setIsLoading(false);
    };

    return (
        <section className="sf-login">
            <Link to="/" className="sf-back-button">
                <img
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768983970/FLECHA_VOLVER_ATRAS_lspqx4.jpg"
                    alt="Volver"
                    className="sf-back-icon"
                />
            </Link>

            <div className="sf-login__box">
                <h1 className="sf-login__title">Iniciar sesión</h1>

                <form className="sf-login__form" onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    
                    <div className="sf-input-container">
                        <svg className="sf-input-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#555555"/>
                        </svg>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="sf-login__input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="sf-input-container">
                        <svg className="sf-input-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z" fill="#555555"/>
                        </svg>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="sf-login__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <a href="#" className="sf-login__forgot">¿Olvidaste tu contraseña?</a>

                    <button 
                        type="submit" 
                        className="sf-btn-login"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>

                </form>

                <div className="sf-login__register-area">
                    <span className="sf-login__no-account">¿No tienes cuenta?</span>
                    <Link to="/register" className="sf-login__register-link">Regístrate aquí</Link>
                </div>
            </div>
        </section>
    );
}

export default Login;