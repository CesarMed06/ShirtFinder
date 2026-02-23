import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './MyAccount.css';
import { FaUser } from 'react-icons/fa';
import FavoriteButton from '../components/FavoriteButton';

const FAV_PER_PAGE = 8;

function MyAccount() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [comments, setComments] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('favorites');
    const [favPage, setFavPage] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const profileRes = await fetch('http://localhost:5000/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!profileRes.ok) throw new Error('Error al cargar perfil');
                const profileData = await profileRes.json();

                const commentsRes = await fetch('http://localhost:5000/api/users/profile/comments', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!commentsRes.ok) throw new Error('Error al cargar comentarios');
                const commentsData = await commentsRes.json();

                if (profileData.success) setProfile(profileData.data);
                if (commentsData.success) setComments(commentsData.data || []);
            } catch (err) {
                setError(err.message);
                if (err.message.includes('token') || err.message.includes('401')) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return setFavorites([]);
                const res = await fetch('http://localhost:5000/api/favorites', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setFavorites(Array.isArray(data) ? data : []);
            } catch (e) {
                setFavorites([]);
            } finally {
                setLoadingFavorites(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const favTotalPages = Math.ceil(favorites.length / FAV_PER_PAGE) || 1;
    const paginatedFavs = favorites.slice((favPage - 1) * FAV_PER_PAGE, favPage * FAV_PER_PAGE);

    if (loading) return <div className="sf-my-account"><p>Cargando perfil...</p></div>;
    if (error) return <div className="sf-my-account"><p className="error">{error}</p></div>;
    if (!profile) return null;

    return (
        <div className="sf-my-account">
            <div className="sf-my-account__header">
                <div className="sf-my-account__title-group">
                    <h1 className="sf-my-account__section-title">Mi cuenta</h1>
                    <div className="sf-my-account__underline"></div>
                </div>
                <div className="sf-my-account__stats-group">
                    <h1 className="sf-my-account__section-title">Estadísticas</h1>
                    <div className="sf-my-account__underline sf-my-account__underline--right"></div>
                </div>
            </div>

            <div className="sf-my-account__layout">
                <div className="sf-my-account__profile-panel">
                    <div className="sf-profile-main">
                        <div className="sf-profile-avatar sf-profile-avatar--placeholder">
                            <FaUser size={120} color="#bdc3c7" />
                        </div>
                        <div className="sf-profile-details">
                            <p className="sf-profile-name">{profile.username}</p>
                            <p className="sf-profile-email">{profile.email}</p>
                            <p className="sf-profile-date">Miembro desde: {new Date(profile.date_registered).toLocaleDateString('es-ES')}</p>
                        </div>
                    </div>
                </div>

                <div className="sf-my-account__stats-panel">
                    <div className="sf-profile-stats-list">
                        <p>Camisetas guardadas: {profile.favorites_count || 0}</p>
                        <p>Comentarios escritos: {profile.comment_count || 0}</p>
                        <p>Posts creados: 0</p>
                    </div>
                </div>
            </div>

            <div className="sf-profile-tabs-container">
                <div className="sf-profile-tabs">
                    <button className={`sf-tab-btn ${activeTab === 'favorites' ? 'active' : ''}`} onClick={() => setActiveTab('favorites')}>
                        MIS FAVORITOS
                    </button>
                    <button className={`sf-tab-btn ${activeTab === 'comments' ? 'active' : ''}`} onClick={() => setActiveTab('comments')}>
                        MIS COMENTARIOS
                    </button>
                    <button className={`sf-tab-btn ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
                        MIS POSTS
                    </button>
                    <button className={`sf-tab-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                        CONFIGURACIÓN
                    </button>
                </div>
                <div className="sf-full-width-line"></div>
            </div>

            <div className="sf-tab-content">
                {activeTab === 'favorites' && (
                    <section className="sf-favs">
                        {loadingFavorites ? (
                            <p className="sf-favs__loading">Cargando favoritos...</p>
                        ) : favorites.length === 0 ? (
                            <div className="sf-favs__empty">
                                <p>Aún no has añadido favoritos</p>
                                <p>Explora el catálogo y guarda tus camisetas favoritas</p>
                            </div>
                        ) : (
                            <>
                                <div className="sf-favs__grid">
                                    {paginatedFavs.map(s => (
                                        <article key={s.id_shirts} className="sf-fav-card">
                                            <div className="sf-fav-card__heart">
                                                <FavoriteButton
                                                    shirtId={s.id_shirts}
                                                    size="small"
                                                    onChange={(val) => {
                                                        if (!val) {
                                                            setFavorites(prev => prev.filter(x => x.id_shirts !== s.id_shirts));
                                                            setFavPage(1);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="sf-fav-card__imageBox" onClick={() => navigate(`/shirt/${s.id_shirts}`)}>
                                                <img
                                                    className="sf-fav-card__img"
                                                    src={(s.image_url || s.image_1)?.replace?.('dwidyinuu', 'dwldyiruu') || (s.image_url || s.image_1)}
                                                    alt={s.team}
                                                />
                                            </div>
                                            <h3 className="sf-fav-card__title">{s.team} {s.season}</h3>
                                            <div className="sf-fav-card__bottom">
                                                <span className="sf-fav-card__price">{s.price}€</span>
                                                <button className="sf-fav-card__btn" onClick={() => navigate(`/shirt/${s.id_shirts}`)}>
                                                    VER MÁS
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {favTotalPages > 1 && (
                                    <div className="sf-pagination" style={{ marginTop: 30 }}>
                                        <button className="sf-pagination__btn" onClick={() => setFavPage(p => p - 1)} disabled={favPage === 1}>‹</button>
                                        {Array.from({ length: favTotalPages }, (_, i) => i + 1).map(n => (
                                            <button
                                                key={n}
                                                className={`sf-pagination__btn${favPage === n ? ' sf-pagination__btn--active' : ''}`}
                                                onClick={() => setFavPage(n)}
                                            >{n}</button>
                                        ))}
                                        <button className="sf-pagination__btn" onClick={() => setFavPage(p => p + 1)} disabled={favPage === favTotalPages}>›</button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                )}

                {activeTab === 'comments' && (
                    <div className="sf-comments-section-minimal">
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment.id_comments} className="sf-comment-card-minimal">
                                    <p>
                                        <strong>
                                            <Link to={`/shirt/${comment.id_shirts}`} style={{ color: 'inherit' }}>
                                                {comment.team}
                                            </Link>
                                        </strong>: {comment.text}
                                    </p>
                                    <span className="sf-comment-date-small">
                                        {new Date(comment.date).toLocaleDateString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>No hay comentarios aún.</p>
                        )}
                    </div>
                )}

                {(activeTab === 'posts' || activeTab === 'settings') && (
                    <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>Por hacer</p>
                )}
            </div>
        </div>
    );
}

export default MyAccount;
