import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ForgotPassword.css';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            Swal.fire({ icon: 'warning', title: 'Las contraseñas no coinciden', confirmButtonColor: '#FF6B35' });
            return;
        }
        if (password.length < 6) {
            Swal.fire({ icon: 'warning', title: 'Mínimo 6 caracteres', confirmButtonColor: '#FF6B35' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password })
            });
            const data = await res.json();

            if (data.success) {
                await Swal.fire({
                    icon: 'success',
                    title: '¡Contraseña actualizada!',
                    text: 'Ya puedes iniciar sesión.',
                    confirmButtonColor: '#FF6B35'
                });
                navigate('/login');
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
                <h1 className="sf-forgot__title">Nueva contraseña</h1>
                <p className="sf-forgot__desc">
                    Introduce tu nueva contraseña y confírmala para completar el proceso.
                </p>
                <form className="sf-forgot__form" onSubmit={handleSubmit}>

                    <div className="sf-forgot__input-wrap">
                        <svg className="sf-forgot__icon" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z" fill="#555555"/>
                        </svg>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Nueva contraseña"
                            className="sf-forgot__input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="sf-forgot__toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                            ) : (
                                <svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4.01.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                            )}
                        </button>
                    </div>

                    <div className="sf-forgot__input-wrap">
                        <svg className="sf-forgot__icon" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z" fill="#555555"/>
                        </svg>
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Confirmar contraseña"
                            className="sf-forgot__input"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />
                        <button type="button" className="sf-forgot__toggle" onClick={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? (
                                <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                            ) : (
                                <svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4.01.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                            )}
                        </button>
                    </div>

                    <button type="submit" className="sf-forgot__btn" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ResetPassword;
