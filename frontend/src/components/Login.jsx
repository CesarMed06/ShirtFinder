import { Link } from 'react-router-dom';

function Login() {
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

                <form className="sf-login__form">
                    <div className="sf-input-wrapper">
                        <img
                            src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768984220/LOGO_EMAIL_tjpc0q.jpg"
                            alt="Email"
                            className="sf-input-icon sf-icon-email"
                        />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="sf-login__input"
                        />
                    </div>

                    <div className="sf-input-wrapper">
                        <img
                            src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768984285/LOGO_CONTRASE%C3%91A_hdfgvv.jpg"
                            alt="Password"
                            className="sf-input-icon sf-icon-password"
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="sf-login__input"
                        />
                    </div>

                    <a href="#" className="sf-login__forgot">¿Olvidaste tu contraseña?</a>

                    <button className="sf-btn-login">Iniciar sesión</button>

                    <button className="sf-btn-google">
                        <img
                            src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768984102/LOGO_GOOGLE_qf6wtm.webp"
                            alt="Google"
                            className="sf-google-icon"
                        />
                        <span>Iniciar sesión con Google</span>
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