import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChatbotContext } from '../context/ChatbotContext';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart, FaUser } from 'react-icons/fa';
import ShirtImageGallery from '../components/ShirtImageGallery';
import FavoriteButton from '../components/FavoriteButton';
import Swal from 'sweetalert2';

const BRAND_URLS = {
    Nike: 'https://www.nike.com/es/w/futbol-camisetas-1gdj0z5l6ka',
    Adidas: 'https://www.adidas.es/camisetas_deportivas-futbol-hombre',
    Puma: 'https://eu.puma.com/es/es/deportes/futbol/camisetas-de-futbol',
    Hummel: 'https://www.hummel.es/deporte/futbol/camisetas-de-clubs',
    Kappa: 'https://www.kappa.com/es/collections/football-jersey'
};

const API_URL = import.meta.env.VITE_API_URL;

function ShirtDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const { setPageData } = useChatbotContext();
    const navigate = useNavigate();

    const [shirt, setShirt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');

    const handleStarClick = (starIndex, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        if (clickX < rect.width / 2) {
            setUserRating(starIndex + 0.5);
        } else {
            setUserRating(starIndex + 1);
        }
    };

    const renderUserStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            let icon;
            if (i < Math.floor(userRating)) icon = <FaStar />;
            else if (i === Math.floor(userRating) && userRating % 1 !== 0) icon = <FaStarHalfAlt />;
            else icon = <FaRegStar />;
            stars.push(
                <button
                    key={i}
                    onClick={(e) => handleStarClick(i, e)}
                    className="sf-detail__star-btn"
                    aria-label={`Valorar con ${i + 1} estrella${i + 1 > 1 ? 's' : ''}`}
                >
                    {icon}
                </button>
            );
        }
        return stars;
    };

    useEffect(() => {
        fetch(`${API_URL}/api/shirts/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Camiseta no encontrada');
                return res.json();
            })
            .then(data => {
                setShirt(data.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

        loadComments();
    }, [id]);

    useEffect(() => {
        if (!shirt) return;
        setPageData({
            type: 'shirt',
            team: shirt.team,
            season: shirt.season,
            league: shirt.league,
            brand: shirt.brand,
            color: shirt.color,
            description: shirt.description,
            averageRating: calculateAverageRating(),
            totalReviews: comments.length
        });
        return () => setPageData(null);
    }, [shirt, comments]);

    const loadComments = async () => {
        try {
            const response = await fetch(`${API_URL}/api/comments/${id}`);
            const data = await response.json();
            if (data.success) setComments(data.data);
        } catch (error) {}
    };

    const calculateAverageRating = () => {
        if (comments.length === 0) return 0;
        const sum = comments.reduce((acc, c) => acc + (c.rating || 0), 0);
        return sum / comments.length;
    };

    const handleSubmitComment = async () => {
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para poder comentar.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#e63946'
            });
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/comments/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text: comment, rating: userRating })
            });
            const data = await response.json();
            if (data.success) {
                setComment('');
                setUserRating(0);
                loadComments();
                Swal.fire({
                    icon: 'success',
                    title: '¡Comentario enviado!',
                    text: 'Tu valoración se ha publicado correctamente.',
                    confirmButtonText: 'Genial',
                    confirmButtonColor: '#e63946',
                    timer: 2500,
                    timerProgressBar: true
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'No se pudo enviar el comentario.',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#e63946'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#e63946'
            });
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) stars.push(<FaStar key={i} />);
            else if (i === fullStars && hasHalfStar) stars.push(<FaStarHalfAlt key={i} />);
            else stars.push(<FaRegStar key={i} />);
        }
        return stars;
    };

    if (loading) return <div className="sf-detail-loading"><p>Cargando...</p></div>;
    if (error) return (
        <div className="sf-detail-error">
            <p>{error}</p>
            <button onClick={() => navigate('/catalog')}>Volver al catálogo</button>
        </div>
    );

    return (
        <div className="sf-detail">
            <div className="sf-detail__top">
                <button
                    onClick={() => navigate(-1)}
                    aria-label="Volver al catálogo"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                >
                    <img
                        src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768983970/FLECHA_VOLVER_ATRAS_lspqx4.jpg"
                        alt="Volver"
                        className="sf-back-icon"
                    />
                </button>
                <div className="sf-detail__breadcrumb">
                    <span>Catálogo / Detalle de la camiseta</span>
                </div>
            </div>

            <div className="sf-detail__container">
                <div className="sf-detail__left" style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
                        <FavoriteButton shirtId={Number(id)} size="medium" />
                    </div>
                    <ShirtImageGallery shirt={shirt} />
                </div>

                <div className="sf-detail__center">
                    <h1 className="sf-detail__title">
                        {shirt.team} {shirt.season}
                    </h1>

                    <div className="sf-detail__rating">
                        <div className="sf-detail__stars">
                            {renderStars(calculateAverageRating())}
                        </div>
                        <span className="sf-detail__reviews">({comments.length} valoraciones)</span>
                    </div>

                    <div className="sf-detail__two-columns">
                        <div className="sf-detail__info">
                            <h2 className="sf-detail__section-title sf-detail__section-title--no-underline sf-detail__section-title--black">Información</h2>
                            <div className="sf-detail__info-grid">
                                <div className="sf-detail__info-row">
                                    <span className="sf-detail__info-label">Equipo</span>
                                    <span className="sf-detail__info-value">{shirt.team}</span>
                                </div>
                                <div className="sf-detail__info-row">
                                    <span className="sf-detail__info-label">Temporada</span>
                                    <span className="sf-detail__info-value">{shirt.season}</span>
                                </div>
                                <div className="sf-detail__info-row">
                                    <span className="sf-detail__info-label">Liga</span>
                                    <span className="sf-detail__info-value">{shirt.league}</span>
                                </div>
                                <div className="sf-detail__info-row">
                                    <span className="sf-detail__info-label">Marca</span>
                                    <span className="sf-detail__info-value">{shirt.brand}</span>
                                </div>
                                <div className="sf-detail__info-row">
                                    <span className="sf-detail__info-label">Colores</span>
                                    <span className="sf-detail__info-value">{shirt.color}</span>
                                </div>
                            </div>
                        </div>

                        <div className="sf-detail__right-column">
                            <div className="sf-detail__buy-section">
                                <h2 className="sf-detail__section-title sf-detail__section-title--no-underline">Dónde comprar</h2>
                                <div className="sf-detail__stores">
                                    <div className="sf-detail__store">
                                        <FaShoppingCart />
                                        <span>Tienda oficial</span>
                                        <a
                                            href={shirt.buy_link || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="sf-detail__store-btn"
                                        >
                                            IR A TIENDA
                                        </a>
                                    </div>
                                    <div className="sf-detail__store">
                                        <FaShoppingCart />
                                        <span>{shirt.brand}</span>
                                        <a
                                            href={BRAND_URLS[shirt.brand] || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="sf-detail__store-btn"
                                        >
                                            IR A TIENDA
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sf-detail__history">
                <h2 className="sf-detail__section-title">Historia y curiosidades</h2>
                {shirt.description && (
                    <p className="sf-detail__history-text">{shirt.description}</p>
                )}
                {shirt.curiosity && (
                    <p className="sf-detail__history-text" style={{ marginTop: '12px' }}>{shirt.curiosity}</p>
                )}
            </div>

            <div className="sf-detail__comments-section">
                <h2 className="sf-detail__section-title">Valoración y comentarios</h2>
                <div className="sf-detail__comments-container">
                    <div className="sf-detail__comment-form">
                        <div className="sf-detail__user-rating">
                            {renderUserStars()}
                        </div>
                        <div className="sf-detail__comment-input-row">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={token ? "Escribe tu comentario..." : "Inicia sesión para comentar"}
                                className="sf-detail__comment-input"
                                disabled={!token}
                                aria-label="Escribe tu comentario"
                            />
                            <button
                                className="sf-detail__submit-btn"
                                onClick={handleSubmitComment}
                                disabled={!token}
                                aria-label="Enviar comentario"
                            >
                                ENVIAR
                            </button>
                        </div>
                    </div>

                    <div className="sf-detail__comments-grid">
                        {comments.length === 0 ? (
                            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#777', fontStyle: 'italic', padding: '40px' }}>
                                Aún no hay comentarios. ¡Sé el primero en comentar!
                            </p>
                        ) : (
                            comments.map(c => (
                                <div key={c.id_comments} className="sf-detail__comment">
                                    <div className="sf-detail__comment-avatar">
                                        {c.avatar_url ? (
                                            <img
                                                src={`${API_URL}${c.avatar_url}`}
                                                alt={c.username}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <FaUser size={20} color="#bdc3c7" />
                                        )}
                                    </div>
                                    <div className="sf-detail__comment-rating-wrapper">
                                        <div className="sf-detail__comment-stars">
                                            {renderStars(c.rating || 0)}
                                        </div>
                                        <div className="sf-detail__comment-content">
                                            <div className="sf-detail__comment-text">{c.text}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShirtDetail;