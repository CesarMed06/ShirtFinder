import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './MyAccount.css';

import { FaUser } from 'react-icons/fa';

function MyAccount() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch Profile
                const profileRes = await fetch('http://localhost:5000/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!profileRes.ok) throw new Error('Error al cargar perfil');
                const profileData = await profileRes.json();

                // Fetch Comments
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const [activeTab, setActiveTab] = useState('favorites');

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
                    <button
                        className={`sf-tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                        onClick={() => setActiveTab('favorites')}
                    >
                        MIS FAVORITOS
                    </button>
                    <button
                        className={`sf-tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('comments')}
                    >
                        MIS COMENTARIOS
                    </button>
                    <button
                        className={`sf-tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        MIS POSTS
                    </button>
                    <button
                        className={`sf-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        CONFIGURACIÓN
                    </button>
                </div>
                <div className="sf-full-width-line"></div>
            </div>

            <div className="sf-tab-content">
                {activeTab === 'favorites' && (
                    <div className="sf-empty-state-minimal">
                        <p>No tienes camisetas favoritas aún.</p>
                        <Link to="/catalog">Explorar catálogo</Link>
                    </div>
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
