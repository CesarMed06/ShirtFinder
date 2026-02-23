import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Heart({ filled, size }) {
    const w = size === 'small' ? 20 : size === 'large' ? 38 : 26;
    const h = size === 'small' ? 18.35 : size === 'large' ? 35 : 24;

    return (
        <svg
            width={w}
            height={h}
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))', transition: 'transform 0.2s' }}
        >
            <path
                d="M12 20s-7.5-4.7-10.3-9C-1 6.5 2.2 1.5 7.4 2.1c2 .2 3.4 1.4 4.6 2.8 1.2-1.4 2.6-2.6 4.6-2.8C21.8 1.5 25 6.5 22.3 11c-2.8 4.3-10.3 9-10.3 9Z"
                fill={filled ? '#E74C3C' : 'none'}
                stroke="#E74C3C"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function FavoriteButton({ shirtId, size = 'medium', className = '', onChange }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !shirtId) return;

        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/favorites/check/${shirtId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal
                });
                const data = await res.json();
                setIsFavorite(!!data?.isFavorite);
            } catch (e) {
            }
        })();

        return () => controller.abort();
    }, [shirtId]);

    const toggleFavorite = async (e) => {
        e?.preventDefault?.();
        e?.stopPropagation?.();

        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({ icon: 'info', title: 'Inicia sesión', text: 'Para guardar favoritos debes estar registrado' });
            return;
        }
        if (loading) return;

        try {
            setLoading(true);

            if (isFavorite) {
                const res = await fetch(`http://localhost:5000/api/favorites/${shirtId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data?.success) {
                    setIsFavorite(false);
                    onChange?.(false);
                    Swal.fire({ icon: 'success', title: 'Eliminado de favoritos', timer: 1500, showConfirmButton: false });
                }
                return;
            }

            const res = await fetch(`http://localhost:5000/api/favorites/${shirtId}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();

            if (data?.success) {
                setIsFavorite(true);
                onChange?.(true);
                Swal.fire({ icon: 'success', title: 'Añadido a favoritos', timer: 1500, showConfirmButton: false });
            } else {
                Swal.fire({ icon: 'info', title: data?.message || 'No se pudo añadir', timer: 1500, showConfirmButton: false });
            }
        } catch (e) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar favoritos' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={className}
            onClick={toggleFavorite}
            disabled={loading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: loading ? 'not-allowed' : 'pointer',
                lineHeight: 0,
                transform: hovered ? 'scale(1.18)' : 'scale(1)',
                transition: 'transform 0.2s',
                opacity: loading ? 0.5 : 1
            }}
        >
            <Heart filled={isFavorite} size={size} />
        </button>
    );
}

export default FavoriteButton;
