import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return `hace ${diff} segundos`;
    if (diff < 3600) return `hace ${Math.floor(diff / 60)} minutos`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
    if (diff < 2592000) return `hace ${Math.floor(diff / 86400)} días`;
    return `hace ${Math.floor(diff / 2592000)} meses`;
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function PostCard({ post }) {
    const navigate = useNavigate();
    const avatarSrc = post.avatar_url
        ? `http://localhost:5000${post.avatar_url}`
        : null;

    return (
        <article
            className="forum-post-card"
            onClick={() => navigate(`/foro/${post.id}`)}
        >
            <div className="forum-post-avatar">
                {avatarSrc ? (
                    <img
                        src={avatarSrc}
                        alt={post.username}
                        className="forum-post-avatar-img"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                ) : null}
                <span style={{ display: avatarSrc ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <FaUser size={24} color="#fff" />
                </span>
            </div>
            <div className="forum-post-body">
                <h3 className="forum-post-title">{post.title}</h3>
                <p className="forum-post-preview">
                    {post.preview}
                    {post.preview?.length >= 80 ? "..." : ""}
                </p>
            </div>
            <div className="forum-post-meta">
                <span>Por {post.username}</span>
                <span>Publicado el {formatDate(post.created_at)}</span>
                <span>Último mensaje {timeAgo(post.created_at)}</span>
                <span>Respuestas: {post.replies_count}</span>
            </div>
        </article>
    );
}

export default PostCard;
