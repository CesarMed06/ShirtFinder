import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart } from 'react-icons/fa';

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
    }, [id]);

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
                    <div className="sf-detail__main-image">
                        <img 
                            src={shirt.image_url} 
                            alt={shirt.team}
                            loading="lazy"
                        />
                    </div>
                    
                    <div className="sf-detail__thumbnails">
                        {[0, 1, 2, 3, 4].map((idx) => (
                            <div 
                                key={idx}
                                className={`sf-detail__thumbnail ${selectedImage === idx ? 'active' : ''}`}
                                onClick={() => setSelectedImage(idx)}
                            >
                                <img src={shirt.image_url} alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sf-detail__center">
                    <h1 className="sf-detail__title">
                        {shirt.team} {shirt.season}
                    </h1>

                    <div className="sf-detail__rating">
                        <div className="sf-detail__stars">
                            {renderStars(3.5)}
                        </div>
                        <span className="sf-detail__reviews">(127 valoraciones)</span>
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
                                    <span className="sf-detail__info-value">Verde / Blanco</span>
                                </div>
                            </div>
                        </div>

                        <div className="sf-detail__right-column">
                            <div className="sf-detail__buy-section">
                                <h2 className="sf-detail__section-title sf-detail__section-title--no-underline">Dónde comprar</h2>
                        
                        <div className="sf-detail__stores">
                            <div className="sf-detail__store">
                                <FaShoppingCart />
                                <span>Tienda oficial Betis</span>
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
                    {shirt.story || 'Esta equipación Hummel 2025/26 es un homenaje directo a la cultura de Sevilla. Mantiene las Trece Barras, seña de identidad del club desde 1911, pero esconde una curiosidad única: en el interior del cuello lleva grabada la frase "Verde, verde como el equipo de mi ciudad". Este detalle es un tributo a la icónica canción de la legendaria artista sevillana María Jiménez. Es una camiseta que fusiona la historia del club con el arte de la ciudad, diseñada con la tecnología Becool para estrellas actuales como Isco o Antony.'}
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
                                placeholder="Escribe tu comentario..."
                                className="sf-detail__comment-input"
                            />
                            <button className="sf-detail__submit-btn">ENVIAR</button>
                        </div>
                    </div>

                    <div className="sf-detail__comments-grid">
                        <div className="sf-detail__comment">
                            <div className="sf-detail__comment-avatar"></div>
                            <div className="sf-detail__comment-rating-wrapper">
                                <div className="sf-detail__comment-stars">
                                    {renderStars(4)}
                                </div>
                                <div className="sf-detail__comment-content">
                                    <p className="sf-detail__comment-text">
                                        El diseño es espectacular y el homenaje a María Jiménez en el cuello es un puntazo. Sin embargo, es más gruesa y da más calor.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="sf-detail__comment">
                            <div className="sf-detail__comment-avatar"></div>
                            <div className="sf-detail__comment-rating-wrapper">
                                <div className="sf-detail__comment-stars">
                                    {renderStars(5)}
                                </div>
                                <div className="sf-detail__comment-content">
                                    <p className="sf-detail__comment-text">
                                        Hummel ha superado este año. Aunque el patrocinador principal no me convence, la camiseta histórica.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="sf-detail__comment">
                            <div className="sf-detail__comment-avatar"></div>
                            <div className="sf-detail__comment-rating-wrapper">
                                <div className="sf-detail__comment-stars">
                                    {renderStars(3)}
                                </div>
                                <div className="sf-detail__comment-content">
                                    <p className="sf-detail__comment-text">
                                        La tela Becool me pareció de peor calidad, como de plástico y muy fácil, muy sexy pero poco original.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="sf-detail__comment">
                            <div className="sf-detail__comment-avatar"></div>
                            <div className="sf-detail__comment-rating-wrapper">
                                <div className="sf-detail__comment-stars">
                                    {renderStars(5)}
                                </div>
                                <div className="sf-detail__comment-content">
                                    <p className="sf-detail__comment-text">
                                        Una de las camisetas más bonitas de los últimos años, muy fresca y cómoda, el detalle del cuello es un toque súper sevillano 10/10
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShirtDetail;
