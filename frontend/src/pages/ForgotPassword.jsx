import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Correo enviado!',
                    text: 'Revisa tu bandeja de entrada y sigue el enlace.',
                    confirmButtonColor: '#FF6B35'
                });
                setEmail('');
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: data.message, confirmButtonColor: '#FF6B35' });
            }
        } catch {
            Swal.fire({ icon: 'error', title: 'Error de conexión', confirmButtonColor: '#FF6B35' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="sf-forgot">
            <div className="sf-forgot__box">
                <h1 className="sf-forgot__title">Recuperar contraseña</h1>
                <p className="sf-forgot__desc">
                    Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <form className="sf-forgot__form" onSubmit={handleSubmit}>
                    <div className="sf-forgot__input-wrap">
                        <svg className="sf-forgot__icon" viewBox="0 0 24 24" fill="none">
                            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#555555"/>
                        </svg>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="sf-forgot__input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="sf-forgot__btn" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar enlace'}
                    </button>
                </form>
                <div className="sf-forgot__bottom">
                    <span className="sf-forgot__remember">¿Recordaste tu contraseña?</span>
                    <button
                        onClick={() => navigate(-1)}
                        className="sf-forgot__login-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                        Inicia sesión aquí
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;
