import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart } from 'react-icons/fa';
import ShirtImageGallery from '../components/ShirtImageGallery';

function ShirtDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [shirt, setShirt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');

    const handleStarClick = (starIndex, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const halfWidth = rect.width / 2;
        
        if (clickX < halfWidth) {
            setUserRating(starIndex + 0.5);
        } else {
            setUserRating(starIndex + 1);
        }
    };

    const renderUserStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            let icon;
            if (i < Math.floor(userRating)) {
                icon = <FaStar />;
            } else if (i === Math.floor(userRating) && userRating % 1 !== 0) {
                icon = <FaStarHalfAlt />;
            } else {
                icon = <FaRegStar />;
            }
            stars.push(
                <button
                    key={i}
                    onClick={(e) => handleStarClick(i, e)}
                    className="sf-detail__star-btn"
                >
                    {icon}
                </button>
            );
        }
        return stars;
    };

    useEffect(() => {
        fetch(`http://localhost:5000/api/shirts/${id}`)
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

    const loadComments = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/comments/${id}`);
            const data = await response.json();
            if (data.success) {
                setComments(data.data);
            }
        } catch (error) {
        }
    };

    const calculateAverageRating = () => {
        if (comments.length === 0) return 0;
        const sum = comments.reduce((acc, c) => acc + (c.rating || 0), 0);
        return sum / comments.length;
    };

    const handleSubmitComment = async () => {
        if (!token) {
            alert('Inicia sesión para comentar');
            return;
        }

        if (!comment.trim()) {
            alert('El comentario no puede estar vacío');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: comment,
                    rating: userRating
                })
            });

            const data = await response.json();

            if (data.success) {
                setComment('');
                setUserRating(0);
                loadComments();
            } else {
                alert(data.message || 'Error al enviar comentario');
            }
        } catch (error) {
            alert('Error al enviar comentario');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} />);
            } else {
                stars.push(<FaRegStar key={i} />);
            }
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="sf-detail-loading">
                <p>Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sf-detail-error">
                <p>{error}</p>
                <button onClick={() => navigate('/catalog')}>Volver al catálogo</button>
            </div>
        );
    }

    return (
        <div className="sf-detail">
            <div className="sf-detail__breadcrumb">
                <span>Catálogo / Detalle de la camiseta</span>
            </div>

            <Link to="/catalog" className="sf-detail__back">
                <img 
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768983970/FLECHA_VOLVER_ATRAS_lspqx4.jpg"
                    alt="Volver"
                    className="sf-back-icon"
                />
            </Link>

            <div className="sf-detail__container">
                <div className="sf-detail__left">
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
                                <span>Adidas</span>
                                <a href="#" className="sf-detail__store-btn">IR A TIENDA</a>
                            </div>
                            <div className="sf-detail__store">
                                <FaShoppingCart />
                                <span>Nike</span>
                                <a href="#" className="sf-detail__store-btn">IR A TIENDA</a>
                            </div>
                                </div>
                            </div>

                            <button className="sf-detail__favorite-btn">
                                AÑADIR A FAVORITOS
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sf-detail__history">
                <h2 className="sf-detail__section-title">Historia y curiosidades</h2>
                <p className="sf-detail__history-text">
                    {shirt.description || 'Descripción no disponible'}
                </p>
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
                            />
                            <button
                                className="sf-detail__submit-btn"
                                onClick={handleSubmitComment}
                                disabled={!token}
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
                                    <div className="sf-detail__comment-avatar"></div>
                                    <div className="sf-detail__comment-rating-wrapper">
                                        <div className="sf-detail__comment-stars">
                                            {renderStars(c.rating || 0)}
                                        </div>
                                        <div className="sf-detail__comment-content">
                                            <div className="sf-detail__comment-text">
                                                {c.text}
                                            </div>
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
