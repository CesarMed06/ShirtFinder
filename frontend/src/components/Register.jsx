import { Link } from 'react-router-dom';

function Register() {
    return (
        <section className="sf-login">
            <Link to="/" className="sf-back-button">
                <img
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768983970/FLECHA_VOLVER_ATRAS_lspqx4.jpg"
                    alt="Volver"
                    className="sf-back-icon"
                />
            </Link>

            <div className="sf-register__box">
                <h1 className="sf-register__title">Crear cuenta</h1>

                <form className="sf-register__form">
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        className="sf-register__input"
                    />

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="sf-register__input"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="sf-register__input"
                    />

                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        className="sf-register__input"
                    />

                    <button type="submit" className="sf-btn-register">Registrarse</button>

                    <button type="button" className="sf-btn-google-register">
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
