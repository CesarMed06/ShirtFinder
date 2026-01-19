import React from 'react';

function Login() {
    return (
    <section className="sf-login">
        <div className="sf-login__box">
        <h1 className="sf-login__title">Iniciar sesión</h1>
        
        <form className="sf-login__form">
            <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="sf-login__input" 
            />
            <input 
            type="password" 
            placeholder="Contraseña" 
            className="sf-login__input" 
            />

            <a href="#" className="sf-login__forgot">¿Olvidaste tu contraseña?</a>

            <button className="sf-btn-login">Iniciar sesión</button>

            <button className="sf-btn-google">
            <span>Iniciar sesión con Google</span>
            </button>
        </form>

        <div className="sf-login__register-area">
            <span className="sf-login__no-account">¿No tienes cuenta?</span>
            <a href="#" className="sf-login__register-link">Regístrate aquí</a>
        </div>
        </div>
    </section>
    );
}

export default Login;