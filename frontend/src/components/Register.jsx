import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        const result = await register(formData.username, formData.email, formData.password);
        
        if (!result.success) {
            setError(result.error || 'Error al registrarse');
        }
        
        setIsLoading(false);
    };

    return (
        <section className="sf-login">
            <Link to="/login" className="sf-back-button">
                <img
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768983970/FLECHA_VOLVER_ATRAS_lspqx4.jpg"
                    alt="Volver"
                    className="sf-back-icon"
                />
            </Link>

            <div className="sf-register__box">
                <h1 className="sf-register__title">Crear cuenta</h1>

                <form className="sf-register__form" onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    
                    <div className="sf-input-container">
                        <svg className="sf-input-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#555555"/>
                        </svg>
                        <input
                            type="text"
                            name="username"
                            placeholder="Nombre de usuario"
                            className="sf-register__input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="sf-input-container">
                        <svg className="sf-input-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#555555"/>
                        </svg>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            className="sf-register__input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="sf-input-container">
                        <svg className="sf-input-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z" fill="#555555"/>
                        </svg>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className="sf-register__input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="sf-input-container">
                        <svg className="sf-input-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z" fill="#555555"/>
                        </svg>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            className="sf-register__input"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="sf-btn-register"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Registrarse'}
                    </button>

                    <button type="button" className="sf-btn-google-register">
                        <svg className="sf-google-icon" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Registrarse con Google
                    </button>
                </form>

                <div className="sf-register__login-area">
                    <span className="sf-register__has-account">¿Ya tienes cuenta?</span>
                    <Link to="/login" className="sf-register__login-link">Inicia sesión aquí</Link>
                </div>
            </div>
        </section>
    );
}

export default Register;