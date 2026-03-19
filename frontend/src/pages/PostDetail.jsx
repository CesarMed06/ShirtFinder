import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './PostDetail.css';

function PostDetail() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const textareaRef = useRef(null);

    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
                const data = await res.json();
                if (!data.success) {
                    Swal.fire({ icon: 'error', title: 'Post no encontrado', timer: 1500, showConfirmButton: false });
                    navigate('/foro');
                    return;
                }
                setPost(data.data);

                const repRes = await fetch(`http://localhost:5000/api/posts/${postId}/replies`);
                const repData = await repRes.json();
                if (repData.success) setReplies(repData.data);
            } catch {
                navigate('/foro');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId, navigate]);

    const handlePublicar = async () => {
        if (!replyText.trim()) return;

        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({ icon: 'warning', title: 'Debes iniciar sesión para responder' })
                .then(() => navigate('/login'));
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ content: replyText })
            });
            const data = await res.json();
            if (!data.success) return Swal.fire('Error', data.message, 'error');
            setReplies(prev => [...prev, data.reply]);
            setReplyText('');
        } catch {
            Swal.fire('Error', 'No se pudo publicar la respuesta', 'error');
        }
    };

    const handleResponder = (username) => {
        setReplyText(`@${username} `);
        textareaRef.current?.focus();
    };

    const renderContent = (text) => {
        return text.split(/(@\w+)/g).map((part, i) =>
            part.startsWith('@')
                ? <span key={i} style={{ color: '#0D6EFD' }}>{part}</span>
                : part
        );
    };

    if (loading) return <div className="pd-loading">Cargando...</div>;
    if (!post) return null;

    return (
        <div className="pd-wrapper">
            <div className="pd-card pd-card--main">
                <h1 className="pd-title">{post.title}</h1>

                <div className="pd-author-row">
                    <div className="pd-avatar pd-avatar--big">
                        {post.avatar_url
                            ? <img src={`http://localhost:5000${post.avatar_url}`} alt="avatar" />
                            : <FaUser size={60} color="#bdc3c7" />}
                    </div>
                    <div>
                        <p className="pd-author">Por {post.username}</p>
                        <p className="pd-date">Publicado el {new Date(post.created_at).toLocaleDateString('es-ES')}</p>
                    </div>
                </div>

                <div className="pd-body-row">
                    <p className="pd-content">{post.content}</p>
                    {post.attachment_url && (
                        <img
                            className="pd-attachment"
                            src={`http://localhost:5000${post.attachment_url}`}
                            alt="adjunto"
                        />
                    )}
                </div>

                <div className="pd-reply-btn-wrap">
                    <button className="pd-btn" onClick={() => handleResponder(post.username)}>
                        RESPONDER
                    </button>
                </div>
            </div>

            {replies.map(reply => (
                <div key={reply.id} className="pd-card pd-card--reply">
                    <div className="pd-reply-left">
                        <div className="pd-avatar pd-avatar--small">
                            {reply.avatar_url
                                ? <img src={`http://localhost:5000${reply.avatar_url}`} alt="avatar" />
                                : <FaUser size={45} color="#bdc3c7" />}
                        </div>
                        <div className="pd-reply-info">
                            <p className="pd-author">Por {reply.username}</p>
                            <p className="pd-date">Publicado el {new Date(reply.created_at).toLocaleDateString('es-ES')}</p>
                            <p className="pd-reply-content">{renderContent(reply.content)}</p>
                        </div>
                    </div>
                    <button className="pd-btn" onClick={() => handleResponder(reply.username)}>
                        RESPONDER
                    </button>
                </div>
            ))}

            <div className="pd-form">
                <label className="pd-form-label">Escribe tu respuesta</label>
                <textarea
                ref={textareaRef}
                className="pd-textarea"
                placeholder="Escribe aquí tu respuesta..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
            />

                <div className="pd-form-btn-wrap">
                    <button className="pd-btn" onClick={handlePublicar}>PUBLICAR</button>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
