import { useState, useCallback } from 'react';
import { FaBell, FaBellSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import Cropper from 'react-easy-crop';
import './Settings.css';

const API_URL = import.meta.env.VITE_API_URL;

async function getCroppedImg(imageSrc, pixelCrop) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
            canvas.toBlob((blob) => {
                if (!blob) { reject(new Error('Canvas vacío')); return; }
                resolve(blob);
            }, 'image/jpeg', 0.95);
        });
        image.addEventListener('error', reject);
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = imageSrc;
    });
}

function Settings({ profile, onAvatarUpdate }) {
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [notificaciones, setNotificaciones] = useState(false);
    const [cropSrc, setCropSrc] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, cap) => setCroppedAreaPixels(cap), []);

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const handleApply = async (e) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }
        if (newPassword && newPassword.length < 6) {
            return Swal.fire('Error', 'Mínimo 6 caracteres', 'error');
        }

        try {
            if (newUsername.trim()) {
                const res = await fetch(`${API_URL}/api/users/update-username`, {
                    method: 'PUT',
                    headers: { ...headers, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newUsername })
                });
                const data = await res.json();
                if (!data.success) return Swal.fire('Error', data.message, 'error');
            }

            if (newEmail.trim()) {
                const res = await fetch(`${API_URL}/api/users/update-email`, {
                    method: 'PUT',
                    headers: { ...headers, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newEmail })
                });
                const data = await res.json();
                if (!data.success) return Swal.fire('Error', data.message, 'error');
                localStorage.setItem('token', data.token);
            }

            if (newPassword.trim()) {
                const res = await fetch(`${API_URL}/api/users/update-password`, {
                    method: 'PUT',
                    headers: { ...headers, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentPassword, newPassword })
                });
                const data = await res.json();
                if (!data.success) return Swal.fire('Error', data.message, 'error');
            }

            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                const res = await fetch(`${API_URL}/api/users/update-avatar`, {
                    method: 'PUT',
                    headers,
                    body: formData
                });
                const data = await res.json();
                if (!data.success) return Swal.fire('Error', data.message, 'error');
                onAvatarUpdate(data.avatarUrl);
            }

            Swal.fire({ icon: 'success', title: 'Cambios aplicados', timer: 1500, showConfirmButton: false });
            setNewUsername('');
            setNewEmail('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setAvatarFile(null);
            setAvatarPreview(null);
        } catch {
            Swal.fire('Error', 'Algo salió mal', 'error');
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        setCropSrc(objectUrl);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setShowCropModal(true);
    };

    const handleCropConfirm = async () => {
        try {
            const blob = await getCroppedImg(cropSrc, croppedAreaPixels);
            const croppedFile = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
            setAvatarFile(croppedFile);
            setAvatarPreview(URL.createObjectURL(blob));
            setShowCropModal(false);
        } catch {
            Swal.fire('Error', 'No se pudo recortar la imagen', 'error');
        }
    };

    const handleNotificaciones = () => {
        const nuevo = !notificaciones;
        setNotificaciones(nuevo);
        Swal.fire({
            title: nuevo ? '🔔 Notificaciones activadas' : '🔕 Notificaciones desactivadas',
            timer: 1500,
            showConfirmButton: false,
            icon: 'success'
        });
    };

    const handleDescargarDatos = async () => {
        try {
            const [profileRes, commentsRes] = await Promise.all([
                fetch(`${API_URL}/api/users/profile`, { headers }),
                fetch(`${API_URL}/api/comments/user/me`, { headers })
            ]);
            const profileData = await profileRes.json();
            const commentsData = await commentsRes.json();

            const p = profileData.data;
            const comentarios = commentsData.data || [];

            const doc = new jsPDF();

            doc.setFillColor(44, 62, 80);
            doc.rect(0, 0, 210, 30, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(20);
            doc.text('ShirtFinder — Mis datos', 14, 20);

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Perfil', 14, 45);

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Usuario: ${p.username}`, 14, 55);
            doc.text(`Email: ${p.email}`, 14, 63);
            doc.text(`Miembro desde: ${new Date(p.date_registered).toLocaleDateString('es-ES')}`, 14, 71);
            doc.text(`Camisetas guardadas: ${p.favorites_count || 0}`, 14, 79);
            doc.text(`Comentarios escritos: ${p.comment_count || 0}`, 14, 87);

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Mis comentarios', 14, 105);

            if (comentarios.length === 0) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(11);
                doc.text('No has hecho ningún comentario aún.', 14, 115);
            } else {
                let y = 115;
                comentarios.forEach((c, i) => {
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(11);
                    doc.text(`${i + 1}. ${c.team} ${c.season}`, 14, y);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`   Valoracion: ${c.rating}/5`, 14, y + 7);
                    doc.text(`   "${c.text}"`, 14, y + 14);
                    doc.text(`   Fecha: ${new Date(c.date).toLocaleDateString('es-ES')}`, 14, y + 21);
                    y += 32;
                });
            }

            doc.save('mis-datos-shirtfinder.pdf');
            Swal.fire({ icon: 'success', title: 'PDF descargado', timer: 1500, showConfirmButton: false });
        } catch {
            Swal.fire('Error', 'No se pudieron descargar los datos', 'error');
        }
    };

    const handleDeleteAccount = () => {
        Swal.fire({
            title: '¿Borrar cuenta?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#555',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`${API_URL}/api/users/delete-account`, {
                        method: 'DELETE',
                        headers
                    });
                    const data = await res.json();
                    if (!data.success) return Swal.fire('Error', data.message, 'error');
                    localStorage.removeItem('token');
                    window.location.href = '/';
                } catch {
                    Swal.fire('Error', 'No se pudo borrar la cuenta', 'error');
                }
            }
        });
    };

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2C3E50',
            cancelButtonColor: '#555',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                window.location.href = '/';
            }
        });
    };

    return (<>
        <div className="sf-settings">
            <div className="sf-settings__left">
                <h2 className="sf-settings__section-title">Editar perfil</h2>

                <form className="sf-settings__form" onSubmit={handleApply}>
                    <div className="sf-settings__row">
                        <label className="sf-settings__label">Cambiar nombre de usuario</label>
                        <input
                            className="sf-settings__input"
                            type="text"
                            placeholder="..."
                            autoComplete="off"
                            value={newUsername}
                            onChange={e => setNewUsername(e.target.value)}
                        />
                    </div>

                    <div className="sf-settings__row">
                        <label className="sf-settings__label">Cambiar correo electrónico</label>
                        <input
                            className="sf-settings__input"
                            type="email"
                            placeholder="..."
                            autoComplete="off"
                            value={newEmail}
                            onChange={e => setNewEmail(e.target.value)}
                        />
                    </div>

                    <div className="sf-settings__row">
                        <label className="sf-settings__label">Cambiar contraseña</label>
                        <div className="sf-settings__password-group">
                            <input
                                className="sf-settings__input"
                                type="password"
                                placeholder="contraseña actual"
                                autoComplete="new-password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                            />
                            <input
                                className="sf-settings__input"
                                type="password"
                                placeholder="nueva contraseña"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <input
                                className="sf-settings__input"
                                type="password"
                                placeholder="repetir nueva contraseña"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sf-settings__row">
                        <label className="sf-settings__label">Cambiar foto de perfil</label>
                        <label className="sf-settings__file-btn">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="preview" className="sf-settings__preview" />
                            ) : (
                                <span>Subir foto</span>
                            )}
                            <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                        </label>
                    </div>
                </form>
            </div>

            <div className="sf-settings__right">
                <h2 className="sf-settings__mas-title">Más</h2>
                <div className="sf-settings__more-btns">
                    <button className="sf-settings__more-btn" onClick={handleNotificaciones}>
                        {notificaciones
                            ? <><FaBellSlash className="sf-settings__bell" /> Desactivar notificaciones</>
                            : <><FaBell className="sf-settings__bell sf-settings__bell--ring" /> Activar notificaciones</>
                        }
                    </button>
                    <button className="sf-settings__more-btn sf-settings__more-btn--danger" onClick={handleDeleteAccount}>
                        Borrar mi cuenta
                    </button>
                    <button className="sf-settings__more-btn" onClick={handleDescargarDatos}>
                        Descargar mis datos
                    </button>
                    <button className="sf-settings__apply-btn" onClick={handleApply}>
                        Aplicar cambios
                    </button>
                </div>

                <button className="sf-settings__logout-btn" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
        </div>

        {showCropModal && (
            <div className="sf-crop-overlay">
                <div className="sf-crop-modal">
                    <h3 className="sf-crop-title">Ajusta tu foto de perfil</h3>
                    <div className="sf-crop-area">
                        <Cropper
                            image={cropSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className="sf-crop-zoom">
                        <span>Zoom</span>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.05}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="sf-crop-slider"
                        />
                    </div>
                    <div className="sf-crop-actions">
                        <button className="sf-crop-btn sf-crop-btn--cancel" onClick={() => setShowCropModal(false)}>
                            Cancelar
                        </button>
                        <button className="sf-crop-btn sf-crop-btn--confirm" onClick={handleCropConfirm}>
                            Aplicar recorte
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>);
}

export default Settings;
