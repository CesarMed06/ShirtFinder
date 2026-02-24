import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
            <button onClick={() => navigate(-1)} className="sf-back-button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <img
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768983970/FLECHA_VOLVER_ATRAS_lspqx4.jpg"
                    alt="Volver"
                    className="sf-back-icon"
                />
            </button>

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
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            className="sf-login__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="sf-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                            ) : (
                                <svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4.01.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                            )}
                        </button>
                    </div>

                    <Link to="/forgot-password" className="sf-login__forgot">¿Olvidaste tu contraseña?</Link>

                    <button type="submit" className="sf-btn-login" disabled={isLoading}>
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
